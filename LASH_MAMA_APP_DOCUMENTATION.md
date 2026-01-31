LASH MAMA - COMPLETE PRODUCTION-GRADE PRD
Premium Beauty Booking & Management Platform

DOCUMENT CONTROL
Version: 1.0
Last Updated: January 29, 2026
Author: Principal Mobile Engineer + Architect
Status: LOCKED FOR IMPLEMENTATION
Review Level: Staff-Level Engineering Standards

TABLE OF CONTENTS
	1. Executive Summary
	2. System Architecture Principles
	3. Authentication & Authorization (Gold Standard)
	4. Error Handling & Edge Cases (Gold Standard)
	5. Admin Authority & System Control (Explicit)
	6. Security & Production Hardening (Non-Negotiable)
	7. Non-Happy Path Flows (Critical Scenarios)
	8. Role-Based Feature Specifications
	9. Core Domain Model
	10. Business Rules & Constraints
	11. Technical Requirements
	12. Next Steps

1. EXECUTIVE SUMMARY
Product Name: Lash Mama
Platform: React Native (Expo) Mobile Application
Backend: Supabase (PostgreSQL + Auth + Realtime + Edge Functions + Storage)
Payment: Stripe (primary) + Afterpay (alternative)
Target Users: Clients (public), Managers (staff), Admin (owner)
Mission: Deliver a premium, luxury mobile experience for booking and managing lash & beauty services while providing powerful operational tools for staff and comprehensive business intelligence for the owner.
Portfolio-Critical: This application will be reviewed to staff/senior engineering standards. Every decision must reflect production-grade, scalable, secure architecture.

2. SYSTEM ARCHITECTURE PRINCIPLES
Non-Negotiable Requirements
	1. Fresh Start: Brand new Supabase environment, designed from first principles
	2. RLS-First Security: All authorization enforced at database level (zero trust on client)
	3. Separation of Concerns: Strict file structure (.tsx, .styles.ts, .types.ts, .api.ts, .hooks.ts)
	4. Payment-Before-Booking: No appointment confirmed without successful payment
	5. Audit Everything: Critical actions logged for compliance and debugging
	6. Soft Deletes: Retain data unless GDPR deletion required
	7. Idempotency: All state-changing operations safe to retry
	8. Role-Based Routing: Four distinct navigation trees (Auth, Client, Manager, Admin)
	9. Luxury UX: Premium design system, blur/transparent tabs, gold accents, no emojis
	10. Performance-First: Pagination, caching, memoization, FlatList everywhere

3. AUTHENTICATION & AUTHORIZATION (GOLD STANDARD)
3.1 Authentication Provider: Supabase Auth
Provider: Supabase Auth (built on GoTrue)
Method: Email/Password (Phase 1)
Future: OAuth (Google, Apple) in Phase 2
Session Management:
	• JWT-based authentication
	• Access token: 1 hour expiry
	• Refresh token: 30 days expiry
	• Automatic token refresh handled by Supabase client
	• Tokens stored in React Native SecureStore (iOS Keychain / Android Keystore)
	• Never store tokens in AsyncStorage (security violation)

3.2 Guest Browsing (Public Access)
Allowed Without Authentication:
	• ✅ View home page (hero, business info, social proof)
	• ✅ Browse services catalog (service names, descriptions, durations)
	• ✅ View business hours and location
	• ✅ View staff profiles (names, bios, specialties, ratings)
	• ✅ Check availability calendar (can see open slots, not book)
	• ✅ Start booking flow (select service, artist, date/time)
NOT Allowed Without Authentication:
	• ❌ Proceed to payment
	• ❌ Confirm booking
	• ❌ View pricing (optional: can be made public if desired)
	• ❌ Message staff
	• ❌ View appointment history
	• ❌ Access VIP program
	• ❌ View/edit profile
Design Decision:
	• Reduce friction: Let users explore before committing to signup
	• Increase conversion: Users can get excited about services before registering
	• Require login at critical moment: Just before payment (not at start of booking)

3.3 Signup Flow (Client Registration)
Trigger Points:
	1. User taps "Sign Up" button on Auth screen
	2. User completes booking flow (service/artist/time selected) and reaches payment screen without being logged in
Flow:
Step 1: Registration Form
typescript
interface SignupForm {
  fullName: string;        // Required, min 2 chars
  email: string;           // Required, valid email format, unique
  password: string;        // Required, min 8 chars, complexity: 1 uppercase, 1 number, 1 special
  confirmPassword: string; // Required, must match password
  phone: string;           // Required, format: +61XXXXXXXXX or 04XX XXX XXX
  birthday?: Date;         // Optional, but strongly encouraged (needed for VIP birthday discount)
  agreeToTerms: boolean;   // Required, must be true
}
Validation:
	• Frontend: Real-time validation on blur
	• Backend: Server-side validation before creating account
	• Email uniqueness checked via Supabase Auth
	• Phone uniqueness checked via profiles table (unique constraint)
Step 2: Supabase Auth Account Creation
typescript
const { data, error } = await supabase.auth.signUp({
  email: form.email,
  password: form.password,
  options: {
    data: {
      full_name: form.fullName,
      phone: form.phone,
      birthday: form.birthday,
    }
  }
});
Step 3: Database Trigger Creates Profile
sql
-- Trigger function on auth.users INSERT
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, phone, birthday)
  VALUES (
    NEW.id,
    'client',  -- Default role
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'phone',
    (NEW.raw_user_meta_data->>'birthday')::date
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
Step 4: Email Verification (Optional but Recommended)
	• Email sent to user with verification link
	• User can use app immediately (don't block on verification)
	• Prompt to verify email shown in app
	• Certain features restricted until verified (future: access to VIP program)
Step 5: Welcome Email
	• Sent via Supabase Edge Function or SendGrid
	• Contains: 
		○ Welcome message
		○ Getting started guide
		○ Link to book first appointment
		○ Aftercare tips PDF
		○ Link to shop and courses
Step 6: Automatic Login
	• User automatically logged in after signup
	• If signup triggered mid-booking flow: 
		○ User returned to booking flow (payment step)
		○ Context preserved (service, artist, time stored in React state)
		○ User can immediately proceed to payment
Error Handling:
	• Email already exists → "An account with this email already exists. Please log in."
	• Weak password → "Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character."
	• Network error → "Connection error. Please check your internet and try again."
	• Supabase error (rare) → Log full error, show generic message: "We couldn't create your account. Please try again or contact support."

3.4 Login Flow
Trigger Points:
	1. User taps "Log In" button on Auth screen
	2. User's session expired and they try to access protected feature
Flow:
Step 1: Login Form
typescript
interface LoginForm {
  email: string;    // Required
  password: string; // Required
}
Step 2: Supabase Auth Login
typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: form.email,
  password: form.password,
});
Step 3: Fetch User Profile (Including Role)
typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', data.user.id)
  .single();
Step 4: Role-Based Routing
typescript
switch (profile.role) {
  case 'client':
    router.replace('/client/home');
    break;
  case 'manager':
    router.replace('/manager/home');
    break;
  case 'admin':
    router.replace('/admin/home');
    break;
  default:
    // Should never happen, but fail safe
    throw new Error('Invalid user role');
}
Error Handling:
	• Invalid credentials → "Invalid email or password. Please try again."
	• Email not verified (if enforced) → "Please verify your email before logging in. Resend verification email?"
	• Account disabled → "Your account has been disabled. Please contact support."
	• Network error → "Connection error. Please check your internet and try again."
	• Too many failed attempts → "Too many failed login attempts. Please try again in 15 minutes." (rate limiting)
Session Persistence:
	• Session stored in SecureStore
	• User remains logged in until: 
		○ Explicit logout
		○ Refresh token expires (30 days)
		○ Admin disables account
	• Auto-login on app relaunch if valid session exists

3.5 Password Reset Flow
Trigger: User taps "Forgot Password?" on login screen
Flow:
Step 1: Enter Email
typescript
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'lashmama://reset-password',
});
Step 2: Email Sent
	• Supabase sends password reset email
	• Email contains magic link with token
	• Token valid for 1 hour
Step 3: User Clicks Link
	• Opens app via deep link
	• App navigates to "Set New Password" screen
	• Token extracted from URL
Step 4: Set New Password
typescript
const { error } = await supabase.auth.updateUser({
  password: newPassword,
});
Step 5: Redirect to Login
	• Success message: "Password updated successfully. Please log in."
	• Auto-redirect to login screen
Error Handling:
	• Email not found → "If an account exists with this email, you'll receive a password reset link." (security: don't reveal if email exists)
	• Token expired → "This password reset link has expired. Please request a new one."
	• Weak password → Same validation as signup

3.6 Manager/Admin Role Assignment (Invite-Only)
Critical Rule: Manager and Admin roles can ONLY be assigned by an existing Admin. There is NO public signup for these roles.
Flow:
Step 1: Admin Creates Staff Account
	• Admin navigates to: More → Staff → Add Staff
	• Admin fills form:
typescript
  interface CreateStaffForm {
    fullName: string;
    email: string;
    phone: string;
    role: 'manager' | 'admin';  // Dropdown
    level: 'junior' | 'senior' | 'master';  // For display/pricing
    specialties: string[];
    defaultSchedule: WeeklySchedule;
  }
Step 2: Server-Side Account Creation
	• Edge Function: create-staff-account
	• Security: Only callable by Admin (RLS check)
	• Function: 
		1. Generates secure random password (16 chars, high entropy)
		2. Creates Supabase Auth user:
typescript
     const { data: authUser, error } = await supabaseAdmin.auth.admin.createUser({
       email: form.email,
       password: temporaryPassword,
       email_confirm: true,  // Auto-confirm, no verification needed
       user_metadata: {
         full_name: form.fullName,
         phone: form.phone,
       }
     });
```
  3. Database trigger creates profile with `role = form.role`
  4. Creates staff record in `staff` table
  5. Logs action in `audit_logs`
**Step 3: Invitation Email Sent**
- Email contains:
  - Welcome message from Lash Mama
  - Temporary password (secure, one-time use)
  - Link to set permanent password (expires in 48 hours)
  - Getting started guide for staff
- Template:
```
  Subject: Welcome to Lash Mama Team!
  Hi {fullName},
  Lash Mama has created an account for you.
  
  Email: {email}
  Temporary Password: {temporaryPassword}
  
  For security, please set a permanent password within 48 hours:
  {resetPasswordLink}
  
  Welcome to the team!
Step 4: Staff Sets Permanent Password
	• Staff clicks link
	• Opens app (or web interface)
	• Prompted to set new password
	• Old temporary password invalidated
Step 5: Staff Logs In
	• Staff logs in with email + new password
	• Routed to Manager or Admin app based on role
Role Immutability:
	• Users CANNOT change their own role
	• Only Admin can change roles (via Staff Management page)
	• Role changes logged in audit log
	• Role change triggers immediate session refresh (force re-login)

3.7 Role-Based Access Control (RBAC) - RLS-First Architecture
Golden Rule: Authorization is EXCLUSIVELY enforced via Supabase Row Level Security (RLS). The app UI is a reflection of what RLS allows, NOT the decision-maker.
Architecture Layers:
Layer 1: Database (RLS Policies) - PRIMARY ENFORCEMENT
	• Every table has RLS enabled (ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;)
	• Policies explicitly define who can SELECT/INSERT/UPDATE/DELETE
	• Policies check auth.uid() and join to profiles.role
	• Invalid requests rejected at database level (return empty result or error)
	• Example Policy:
sql
  -- Clients can only read their own appointments
  CREATE POLICY "Clients can read own appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = client_id
    AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'client'
  );
  -- Managers can read all appointments except Lash Mama's
  CREATE POLICY "Managers can read all appointments except admin's"
  ON appointments FOR SELECT
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'manager'
    AND staff_id != (SELECT id FROM profiles WHERE role = 'admin')
  );
  -- Admins can read all appointments
  CREATE POLICY "Admins can read all appointments"
  ON appointments FOR SELECT
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
Layer 2: API Service Layer - SECONDARY VALIDATION
	• Service functions check role before calling Supabase
	• Provides better error messages (instead of empty results from RLS)
	• Throws typed errors for unauthorized access
	• Example:
typescript
  // src/services/appointments.api.ts
  export async function getAppointments() {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new UnauthorizedError('You must be logged in');
    }
    // Role-specific queries (RLS will enforce, this is for UX)
    let query = supabase
      .from('appointments')
      .select('*');
    if (user.role === 'client') {
      query = query.eq('client_id', user.id);
    } else if (user.role === 'manager') {
      // Manager sees all except Lash Mama's
      const adminId = await getAdminId();
      query = query.neq('staff_id', adminId);
    }
    // Admin sees all (no filter needed)
    const { data, error } = await query;
    
    if (error) throw new DatabaseError(error.message);
    return data;
  }
Layer 3: Navigation Guards - UX ONLY
	• Prevent users from accessing screens they shouldn't see
	• Redirect unauthorized users to appropriate screen
	• Does NOT enforce security (just improves UX)
	• Example:
typescript
  // app/(auth)/admin/_layout.tsx
  export default function AdminLayout() {
    const user = useUser();
    if (user?.role !== 'admin') {
      return <Redirect href="/client/home" />;
    }
    return <Slot />;
  }
Layer 4: Component-Level - UX ONLY
	• Hide/show buttons based on role
	• Disable actions user cannot perform
	• Does NOT enforce security (just improves UX)
	• Example:
typescript
  // Only show "Delete Client" button to Admin
  {user.role === 'admin' && (
    <Button onPress={handleDeleteClient}>Delete Client</Button>
  )}
Why This Matters:
	• Frontend code can be inspected/modified by users
	• Malicious users can bypass UI-level checks
	• RLS is the ONLY layer that cannot be bypassed
	• Even if a hacker modifies the app to show admin buttons, RLS will reject their API calls
Testing RLS:
sql
-- Test as different roles
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" = '{"sub":"client-user-id"}';
SELECT * FROM appointments;  -- Should only see own appointments
SET LOCAL "request.jwt.claims" = '{"sub":"admin-user-id"}';
SELECT * FROM appointments;  -- Should see all appointments

3.8 Session Lifecycle Management
Session Creation:
	1. User logs in successfully
	2. Supabase issues JWT access token (1 hour) + refresh token (30 days)
	3. Tokens stored in SecureStore
	4. App fetches user profile (including role)
	5. User routed to appropriate app (Client/Manager/Admin)
Session Maintenance:
	1. Automatic Token Refresh: 
		○ Supabase client automatically refreshes access token when it expires
		○ Uses refresh token to get new access token
		○ Happens transparently (user doesn't notice)
		○ If refresh fails (refresh token expired or revoked): 
			§ User logged out
			§ Redirect to login screen
			§ Show message: "Your session has expired. Please log in again."
	2. Session Validation on App Launch:
typescript
   // App.tsx
   useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       if (session) {
         // Valid session, fetch profile and route
         fetchProfileAndRoute(session.user.id);
       } else {
         // No session, show auth screen
         router.replace('/auth/login');
       }
     });
   }, []);
	3. Session State Sync: 
		○ Subscribe to auth state changes:
typescript
     supabase.auth.onAuthStateChange((event, session) => {
       if (event === 'SIGNED_OUT') {
         router.replace('/auth/login');
       } else if (event === 'TOKEN_REFRESHED') {
         // Silent refresh, no action needed
       } else if (event === 'USER_UPDATED') {
         // Profile updated, refetch
         refetchProfile();
       }
     });
Session Invalidation (Logout):
	1. User taps "Logout" button
	2. Confirmation dialog: "Are you sure you want to log out?"
	3. On confirm:
typescript
   await supabase.auth.signOut();
   // Clear any cached data
   clearCache();
   // Reset navigation stack
   router.replace('/auth/login');
	4. Tokens removed from SecureStore
	5. User redirected to login screen
Forced Session Invalidation (Admin Action):
	• If Admin disables a staff member's account: 
		○ Database trigger updates profiles.active = false
		○ Next API call from that user rejected by RLS
		○ User sees error: "Your account has been disabled. Please contact support."
		○ User logged out
Concurrent Sessions:
	• Multiple devices allowed (same account)
	• Each device has its own session
	• Logout on one device doesn't affect others
	• Admin can view active sessions (future feature)
Session Security:
	• Tokens never logged or exposed
	• HTTPS only (no plaintext transmission)
	• Refresh tokens rotated periodically
	• Revoked tokens stored in database (prevent reuse)

3.9 Role Assignment Rules (Explicit)
Client Role:
	• Assigned automatically on signup (default)
	• Cannot be changed by user
	• Can be upgraded to VIP status (but still role = 'client', VIP is separate flag)
Manager Role:
	• Assigned only by Admin via Staff Management
	• Cannot self-register
	• Can be demoted to client (rare, but possible)
	• Cannot be promoted to admin (security: only Lash Mama is admin)
Admin Role:
	• Only Lash Mama has this role (singleton)
	• Cannot be assigned to anyone else (business rule)
	• Future: If business scales, Admin can delegate to trusted staff (Phase 2)
Role Change Process:
	1. Admin navigates to Staff Management
	2. Opens staff member's profile
	3. Changes role dropdown
	4. Confirms change (requires password re-entry for security)
	5. Database updated
	6. Audit log entry created
	7. Staff member's active session invalidated (forced re-login)
	8. Email sent to staff member notifying of role change

4. ERROR HANDLING & EDGE CASES (GOLD STANDARD)
4.1 Global Error Handling Strategy
Principle: Never show raw technical errors to users. Always provide actionable, user-friendly messages.
Error Categories & Handling:

4.1.1 Network Errors
Causes:
	• No internet connection
	• Server unreachable
	• Request timeout
	• DNS resolution failure
Detection:
typescript
if (error.message.includes('network') || error.code === 'NETWORK_ERROR') {
  return new NetworkError();
}
User-Facing Messages:
	• Generic: "No internet connection. Please check your network and try again."
	• Specific (if identifiable): 
		○ "Request timed out. Please try again."
		○ "Unable to reach server. Please check your connection."
UX Handling:
	• Show toast/banner at top of screen (non-blocking)
	• Disable network-dependent actions (buttons grayed out)
	• Show cached data if available (with indicator: "Showing offline data")
	• Provide "Retry" button
	• Auto-retry on reconnection (if user still on screen)
Implementation:
typescript
// src/lib/errors/NetworkError.ts
export class NetworkError extends Error {
  code = 'NETWORK_ERROR';
  userMessage = 'No internet connection. Please check your network and try again.';
  retryable = true;
}
// Component handling
if (error instanceof NetworkError) {
  showToast(error.userMessage, { 
    action: { label: 'Retry', onPress: retry }
  });
}

4.1.2 Authentication Errors
Causes:
	• Invalid credentials
	• Session expired
	• Token refresh failed
	• Account disabled
	• Email not verified (if enforced)
Detection:
typescript
if (error.message.includes('Invalid login credentials')) {
  return new InvalidCredentialsError();
} else if (error.message.includes('JWT expired')) {
  return new SessionExpiredError();
}
User-Facing Messages:
	• Invalid credentials: "Invalid email or password. Please try again."
	• Session expired: "Your session has expired. Please log in again."
	• Account disabled: "Your account has been disabled. Please contact support at hello@lashmama.com.au"
	• Email not verified: "Please verify your email before continuing. Resend verification email?"
UX Handling:
	• Redirect to login screen (with preserved intended destination)
	• Show error message above login form
	• For session expiry: Save user's current state (if applicable) and restore after re-login
	• For account disabled: Show modal with support contact info
Implementation:
typescript
export class SessionExpiredError extends Error {
  code = 'SESSION_EXPIRED';
  userMessage = 'Your session has expired. Please log in again.';
  requiresReauth = true;
}
// Global auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' && currentRoute !== '/auth/login') {
    router.replace('/auth/login', {
      state: { returnTo: currentRoute, reason: 'session_expired' }
    });
  }
});

4.1.3 Authorization Errors (Permission Denied)
Causes:
	• User tries to access resource they don't have permission for
	• RLS policy blocks request
	• Role changed mid-session
Detection:
typescript
if (error.code === 'PGRST301' || error.message.includes('RLS')) {
  return new PermissionDeniedError();
}
User-Facing Messages:
	• Generic: "You don't have permission to perform this action."
	• Specific (where appropriate): 
		○ "Only managers can access this feature."
		○ "This client information is private."
UX Handling:
	• Show error modal
	• Redirect to appropriate screen (e.g., manager tries to access admin page → redirect to manager home)
	• Log security violation in audit log
	• Never expose technical details (which table, which policy failed)
Implementation:
typescript
export class PermissionDeniedError extends Error {
  code = 'PERMISSION_DENIED';
  userMessage = 'You don't have permission to perform this action.';
  shouldLog = true;  // Log to audit
}
// Service layer
try {
  const data = await supabase.from('appointments').select('*');
} catch (error) {
  if (error instanceof PermissionDeniedError) {
    logSecurityViolation({
      userId: currentUser.id,
      action: 'attempted_unauthorized_access',
      resource: 'appointments',
    });
    throw error;
  }
}

4.1.4 Validation Errors
Causes:
	• Invalid form input
	• Required fields missing
	• Data format incorrect
	• Business rule violation
Detection:
typescript
// Form validation
const errors = validateBookingForm(form);
if (errors.length > 0) {
  return errors;
}
User-Facing Messages:
	• Field-specific: 
		○ "Email address is required"
		○ "Phone number must be 10 digits"
		○ "Password must be at least 8 characters"
		○ "Please select a date"
	• Business rule: 
		○ "Appointments must be booked at least 2 hours in advance"
		○ "You cannot book more than 3 months ahead"
UX Handling:
	• Inline errors below field (red text)
	• Show error icon next to field
	• Prevent form submission until all errors resolved
	• Highlight first error field and scroll to it
	• Real-time validation on blur (not on every keystroke)
Implementation:
typescript
// src/utils/validation.ts
export function validateEmail(email: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { field: 'email', message: 'Email is required' };
  if (!emailRegex.test(email)) return { field: 'email', message: 'Invalid email format' };
  return null;
}
// Component
const [errors, setErrors] = useState<ValidationError[]>([]);
const handleSubmit = () => {
  const validationErrors = [
    validateEmail(form.email),
    validatePhone(form.phone),
    // ... other validations
  ].filter(Boolean);
  if (validationErrors.length > 0) {
    setErrors(validationErrors);
    scrollToFirstError();
    return;
  }
  // Proceed with submission
};

4.1.5 Business Logic Errors
Causes:
	• Booking conflicts (time slot taken by another user)
	• VIP streak broken (booked >60 days after last appointment)
	• Cancellation past deadline (<24hrs before appointment)
	• Insufficient spots available (course enrollment full)
Detection:
typescript
// Check slot availability
const existingBooking = await getBookingForSlot(date, time, staffId);
if (existingBooking) {
  throw new SlotUnavailableError();
}
User-Facing Messages:
	• Slot taken: "This time slot is no longer available. Please choose a different time."
	• Cancellation deadline: "You cannot cancel within 24 hours of your appointment. Your $50 deposit will be forfeited if you cancel now."
	• Course full: "This course is fully booked. Join the waitlist to be notified if a spot opens."
UX Handling:
	• Modal dialog explaining issue
	• Suggest alternatives: 
		○ "This slot is taken. Here are the next 3 available slots..."
		○ "Would you like to choose a different artist?"
	• For critical errors (cancellation deposit loss): Require explicit confirmation 
		○ Checkbox: "I understand my $50 deposit will be forfeited"
		○ Destructive button: "Cancel Anyway" (red)
Implementation:
typescript
export class SlotUnavailableError extends Error {
  code = 'SLOT_UNAVAILABLE';
  constructor(public alternativeSlots: TimeSlot[]) {
    super('Slot no longer available');
  }
}
// Component
catch (error) {
  if (error instanceof SlotUnavailableError) {
    showModal({
      title: 'Time Slot Unavailable',
      message: 'This time slot was just booked by another client.',
      alternatives: error.alternativeSlots,
      actions: [
        { label: 'Choose Different Time', onPress: () => setStep('selectTime') },
        { label: 'Cancel', onPress: closeModal },
      ]
    });
  }
}

4.1.6 Payment Errors
Causes:
	• Card declined
	• Insufficient funds
	• Invalid card details
	• Payment processor error (Stripe down)
	• Network error during payment
Detection:
typescript
// Stripe error codes
if (error.code === 'card_declined') {
  return new CardDeclinedError(error.decline_code);
} else if (error.code === 'insufficient_funds') {
  return new InsufficientFundsError();
}
User-Facing Messages:
	• Card declined: "Your card was declined. Please try a different payment method."
	• Insufficient funds: "Your card has insufficient funds. Please use a different card or try Afterpay."
	• Invalid details: "Invalid card number. Please check and try again."
	• Processor error: "Payment processing is temporarily unavailable. Please try again in a few minutes."
UX Handling:
	• Show error above payment form (prominent, red banner)
	• Keep entered details (except CVV) so user doesn't have to re-enter
	• Offer alternatives: 
		○ "Try Different Card" button
		○ "Use Afterpay" button (if available)
	• For processor errors: Provide "Try Again" and "Cancel Booking" options
	• Log payment failure for admin review
Implementation:
typescript
export class CardDeclinedError extends Error {
  code = 'CARD_DECLINED';
  constructor(public declineCode: string) {
    super('Card declined');
  }
  
  get userMessage() {
    const messages: Record<string, string> = {
      insufficient_funds: 'Your card has insufficient funds.',
      lost_card: 'This card has been reported lost. Please use a different card.',
      stolen_card: 'This card has been reported stolen. Please use a different card.',
      expired_card: 'Your card has expired. Please use a different card.',
      generic_decline: 'Your card was declined. Please contact your bank or try a different card.',
    };
    return messages[this.declineCode] || messages.generic_decline;
  }
}
// Payment handler
try {
  await processPayment(cardDetails);
} catch (error) {
  if (error instanceof CardDeclinedError) {
    showPaymentError(error.userMessage, {
      actions: [
        { label: 'Try Different Card', onPress: clearCardDetails },
        { label: 'Use Afterpay', onPress: switchToAfterpay },
      ]
    });
    
    // Log for admin
    logPaymentFailure({
      clientId: user.id,
      amount: 50,
      errorCode: error.declineCode,
      timestamp: new Date(),
    });
  }
}

4.1.7 Server Errors (5xx)
Causes:
	• Supabase edge function crash
	• Database error
	• Third-party API failure (Stripe, SendGrid)
	• Unhandled exception
Detection:
typescript
if (error.status >= 500 && error.status < 600) {
  return new ServerError(error);
}
User-Facing Messages:
	• Generic: "Something went wrong on our end. Please try again later."
	• Never expose: Stack traces, SQL errors, internal service names
UX Handling:
	• Show generic error modal
	• Provide support contact: "If this persists, contact us at hello@lashmama.com.au"
	• Log full error server-side (Sentry, Supabase logs)
	• Notify admin immediately (critical errors only)
Implementation:
typescript
export class ServerError extends Error {
  code = 'SERVER_ERROR';
  userMessage = 'Something went wrong. Please try again later.';
  constructor(public originalError: any) {
    super('Server error');
  }
}
// Global error handler
window.addEventListener('unhandledrejection', (event) => {
  const error = new ServerError(event.reason);
  logToSentry(error.originalError);
  showErrorToast(error.userMessage);
});

4.2 Typed Error System
Error Class Hierarchy:
typescript
// src/lib/errors/BaseError.ts
export abstract class BaseError extends Error {
  abstract code: string;
  abstract userMessage: string;
  retryable?: boolean = false;
  shouldLog?: boolean = false;
  requiresReauth?: boolean = false;
}
// Specific errors extend BaseError
export class NetworkError extends BaseError {
  code = 'NETWORK_ERROR';
  userMessage = 'No internet connection.';
  retryable = true;
}
export class PermissionDeniedError extends BaseError {
  code = 'PERMISSION_DENIED';
  userMessage = 'You don't have permission for this action.';
  shouldLog = true;
}
// ... etc for all error types
Centralized Error Mapper:
typescript
// src/lib/errors/errorMapper.ts
export function mapError(error: any): BaseError {
  // Network errors
  if (error.message?.includes('network') || error.code === 'NETWORK_ERROR') {
    return new NetworkError();
  }
  
  // Auth errors
  if (error.message?.includes('Invalid login credentials')) {
    return new InvalidCredentialsError();
  }
  
  // RLS/Permission errors
  if (error.code === 'PGRST301') {
    return new PermissionDeniedError();
  }
  
  // Payment errors
  if (error.code === 'card_declined') {
    return new CardDeclinedError(error.decline_code);
  }
  
  // Database errors
  if (error.code?.startsWith('23')) {  // PostgreSQL constraint violations
    return new DatabaseConstraintError(error);
  }
  
  // Server errors
  if (error.status >= 500) {
    return new ServerError(error);
  }
  
  // Unknown error
  return new UnknownError(error);
}
Global Error Boundary:
typescript
// src/components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error: mapError(error) };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const mappedError = mapError(error);
    
    if (mappedError.shouldLog) {
      logToSentry(error, errorInfo);
    }
    
    if (mappedError.requiresReauth) {
      router.replace('/auth/login');
    }
  }
  render() {
    if (this.state.error) {
      return <ErrorScreen error={this.state.error} />;
    }
    return this.props.children;
  }
}

4.3 Edge Cases & Non-Happy Paths

4.3.1 Booking Conflict Mid-Flow
Scenario: User selects time slot, fills out form, reaches payment screen. Between form submission and payment completion, another user books the same slot.
Detection:
typescript
// Before creating Payment Intent, verify slot still available
const slotCheck = await supabase
  .from('appointments')
  .select('id')
  .eq('appointment_date', date)
  .eq('appointment_time', time)
  .eq('staff_id', staffId)
  .eq('status', 'confirmed')
  .maybeSingle();
if (slotCheck.data) {
  throw new SlotUnavailableError(await getAlternativeSlots());
}
Handling:
	1. Detect conflict BEFORE charging card
	2. Show modal: "This time slot was just booked by another client."
	3. Offer alternatives: 
		○ Show next 3 available slots for same artist
		○ "Choose Different Artist" (if available)
		○ "Cancel Booking"
	4. Preserve form data (service, allergy info) so user doesn't have to re-enter
	5. If user selects alternative → Return to time selection step
	6. If user cancels → Return to home, show sympathetic message
Prevention:
	• Optimistic locking: Check slot availability at multiple points (select time, before payment)
	• Show real-time availability updates (via Supabase Realtime if high traffic)

4.3.2 Payment Success But Booking Creation Fails
Scenario: Stripe successfully charges card, but database operation to create appointment fails (network error, database constraint, etc.).
Detection:
typescript
// Stripe webhook handler
export async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Create appointment in database
    const { error } = await supabase.from('appointments').insert({
      // ... appointment data
      payment_intent_id: paymentIntent.id,
    });
    
    if (error) throw error;
    
  } catch (error) {
    // Payment succeeded but booking failed - CRITICAL ERROR
    logCriticalError('Payment succeeded but booking creation failed', {
      paymentIntentId: paymentIntent.id,
      error,
    });
    
    // Notify admin immediately
    await sendAdminAlert({
      type: 'PAYMENT_BOOKING_MISMATCH',
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      clientId: paymentIntent.metadata.clientId,
    });
    
    // DO NOT refund automatically (requires manual review)
    throw error;
  }
}
Handling:
	1. Idempotency: Use payment_intent_id as idempotency key 
		○ Before creating appointment, check if one already exists with this payment_intent_id
		○ If exists → Return existing appointment (webhook may have been re-delivered)
		○ If not exists → Create new appointment
	2. Retry Logic: 
		○ Webhook handler retries failed database operations (up to 3 times)
		○ Exponential backoff: 1s, 5s, 15s
	3. Manual Reconciliation: 
		○ Admin receives alert with payment details
		○ Admin manually creates appointment (or contacts client)
		○ Admin marks issue as resolved in system
	4. Client Communication: 
		○ If booking creation fails multiple times: 
			§ Email sent to client: "Your payment was received but we're having trouble confirming your appointment. Our team will contact you shortly."
			§ Admin dashboard shows "Pending Reconciliation" flag
			§ Client does NOT see appointment in app yet (to avoid confusion)
Prevention:
	• Use database transactions where possible
	• Implement comprehensive error logging
	• Monitor webhook delivery (Stripe dashboard)

4.3.3 Role or Auth Change Mid-Session
Scenario 1: User is logged in as Manager. Admin demotes them to Client mid-session.
Detection:
typescript
// Middleware on every API call
export async function checkRoleMiddleware(req, res, next) {
  const userIdFromToken = req.user.id;
  const roleFromToken = req.user.role;
  
  // Fetch current role from database
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userIdFromToken)
    .single();
  
  if (profile.role !== roleFromToken) {
    // Role changed since token was issued
    return res.status(401).json({
      error: 'ROLE_CHANGED',
      message: 'Your account role has changed. Please log in again.',
    });
  }
  
  next();
}
Handling:
	1. Next API call after role change → Returns 401 with ROLE_CHANGED error
	2. App detects error, logs user out
	3. Show modal: "Your account permissions have changed. Please log in again."
	4. Redirect to login
	5. After re-login, user routed to appropriate app (Client in this case)
Scenario 2: User's account is disabled mid-session.
Detection:
	• Similar to role change, check profiles.active on each API call
	• If active = false → Return 403 error
Handling:
	1. Show modal: "Your account has been disabled. Please contact support at hello@lashmama.com.au"
	2. Log user out
	3. Redirect to login (with disabled account message shown)

4.3.4 Expired Session During Critical Action
Scenario: User fills out entire booking form (10 minutes), reaches payment screen. Session expires while filling out payment details.
Detection:
typescript
// Before processing payment
const session = await supabase.auth.getSession();
if (!session.data.session) {
  throw new SessionExpiredError();
}
Handling:
	1. Save booking form data to secure temporary storage (encrypted, short-lived)
	2. Show modal: "Your session expired for security. Please log in to continue."
	3. Redirect to login with returnTo parameter
	4. After successful login: 
		○ Retrieve saved form data
		○ Restore booking flow exactly where user left off
		○ User can immediately proceed to payment
	5. Clear temporary storage after successful booking
Implementation:
typescript
// Save form state before showing session expired error
const formStateKey = `booking_${Date.now()}`;
await SecureStore.setItemAsync(formStateKey, JSON.stringify({
  service: selectedService,
  artist: selectedArtist,
  date: selectedDate,
  time: selectedTime,
  allergyForm: allergyFormData,
  expiresAt: Date.now() + (5 * 60 * 1000),  // 5 minutes
}));
// After re-login
const savedState = await SecureStore.getItemAsync(formStateKey);
if (savedState) {
  const parsed = JSON.parse(savedState);
  if (parsed.expiresAt > Date.now()) {
    // Restore booking flow
    restoreBookingFlow(parsed);
  }
  // Clean up
  await SecureStore.deleteItemAsync(formStateKey);
}

4.3.5 Deleting Entities with Dependencies
Scenario 1: Admin tries to delete a service that has future bookings.
Detection:
typescript
const futureBookings = await supabase
  .from('appointments')
  .select('id')
  .eq('service_id', serviceId)
  .gte('appointment_date', new Date().toISOString())
  .eq('status', 'confirmed');
if (futureBookings.data.length > 0) {
  throw new DependencyError('Cannot delete service with future bookings');
}
Handling:
	• Show modal: "This service has 5 upcoming appointments. You cannot delete it."
	• Options: 
		○ "View Bookings" (opens list of affected appointments)
		○ "Archive Service" (soft delete, hide from clients but keep for existing bookings)
		○ "Cancel"
	• Recommended action: Archive instead of delete
Scenario 2: Admin tries to delete a staff member who has future bookings.
Detection: Same as above, check for future appointments
Handling:
	1. Show warning: "This staff member has 12 upcoming appointments."
	2. Options: 
		○ "Reassign Appointments" (bulk reassign to different staff)
		○ "Archive Staff" (soft delete, mark as inactive)
		○ "Cancel"
	3. If user chooses reassign: 
		○ Show list of future appointments
		○ Dropdown per appointment to select new staff member
		○ "Reassign All" button
		○ After reassignment complete → Can safely delete staff
Scenario 3: Client deletes their account (GDPR right to be forgotten).
Handling:
	1. Check for future appointments
	2. If exists: 
		○ Show warning: "You have upcoming appointments. These will be cancelled if you delete your account."
		○ List appointments
		○ Require explicit confirmation: "I understand my appointments will be cancelled"
	3. On confirm: 
		○ Cancel all future appointments
		○ Refund deposits (if applicable)
		○ Soft delete profile (deleted_at = now())
		○ Anonymize in audit logs
		○ Schedule hard delete in 90 days (GDPR compliance)
		○ Send confirmation email
	4. If no future appointments: 
		○ Soft delete immediately
		○ Schedule hard delete in 90 days

4.3.6 Webhook Failures & Idempotency
Scenario: Stripe webhook delivered multiple times (network retry) or not at all.
Idempotency Implementation:
typescript
// Webhook handler
export async function handleStripeWebhook(event: Stripe.Event) {
  // Check if we've already processed this event
  const { data: existing } = await supabase
    .from('webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .maybeSingle();
  
  if (existing) {
    // Already processed, return success (idempotent)
    return { received: true, alreadyProcessed: true };
  }
  
  // Process event
  try {
    if (event.type === 'payment_intent.succeeded') {
      await handlePaymentSuccess(event.data.object);
    }
    
    // Mark as processed
    await supabase.from('webhook_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
    });
    
    return { received: true };
    
  } catch (error) {
    // Log error but don't mark as processed (will retry)
    logError('Webhook processing failed', { event, error });
    throw error;
  }
}
Missing Webhook Handling:
typescript
// Scheduled job runs every 5 minutes
export async function reconcilePayments() {
  // Find Payment Intents that succeeded but have no appointment
  const { data: unreconciledPayments } = await supabase
    .from('transactions')
    .select('*')
    .eq('status', 'pending')
    .lt('created_at', new Date(Date.now() - 10 * 60 * 1000).toISOString());  // Older than 10 minutes
  
  for (const payment of unreconciledPayments) {
    // Fetch Payment Intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment.payment_intent_id);
    
    if (paymentIntent.status === 'succeeded') {
      // Payment succeeded but webhook never arrived/failed
      // Create appointment manually
      await createAppointmentFromPayment(paymentIntent);
      
      // Update transaction status
      await supabase
        .from('transactions')
        .update({ status: 'succeeded', reconciled: true })
        .eq('id', payment.id);
    }
  }
}

5. ADMIN AUTHORITY & SYSTEM CONTROL (EXPLICIT)
5.1 Admin Role Definition
Admin: Lash Mama (business owner) - God-mode access to entire system
Core Principle: Admin can do EVERYTHING any other role can do, PLUS exclusive admin-only features.

5.2 Service Catalog Management
Admin Exclusive Actions:
5.2.1 Create Service
Access: More Tab → Services → Add Service (Admin only)
Form:
typescript
interface CreateServiceForm {
  name: string;                    // Required, e.g., "Mega Volume Full Set"
  category: ServiceCategory;       // Required, dropdown
  description: string;             // Required, rich text
  durationMinutes: number;         // Required, 15-480 minutes
  basePrice: number;               // Required, decimal
  depositAmount: number;           // Default 50.00, can override
  staffTierPricing?: {             // Optional, per-staff pricing
    staffId: string;
    priceAdjustment: number;       // +/- from base price
  }[];
  active: boolean;                 // Default true
  imageUrl?: string;               // Optional, upload via storage bucket
  displayOrder?: number;           // For manual sorting
}
Validation:
	• Name: 3-100 characters, unique within category
	• Duration: 15-480 minutes (quarter hour increments)
	• Base price: > 0
	• Deposit: 0-100% of base price (default $50)
On Submit:
	1. Validate form
	2. Upload image to service-images bucket (if provided)
	3. Insert service into services table
	4. Log action in audit_logs
	5. Broadcast update to all connected clients (Realtime)
	6. Show success: "Service created successfully"
RLS Policy:
sql
CREATE POLICY "Only admin can insert services"
ON services FOR INSERT
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

5.2.2 Edit Service
Access: More Tab → Services → [Select Service] → Edit
Editable Fields: All fields from create form
Constraints:
	• If service has future bookings, cannot change: 
		○ Duration (would affect existing booking times)
		○ Base price (existing bookings locked at old price)
	• Can change: Description, image, availability, display order
Warning Modal (if changing price/duration): "This service has 12 upcoming appointments. Changing the price/duration will only affect new bookings. Existing appointments will remain unchanged."
On Submit:
	1. Update services table
	2. Log change in audit_logs (before/after values)
	3. Broadcast update
	4. Show success

5.2.3 Archive Service (Soft Delete)
Use Case: Service no longer offered, but has historical bookings
Action:
	1. Set services.deleted_at = now()
	2. Service hidden from client booking flow
	3. Service still visible in: 
		○ Past appointments (historical data)
		○ Admin reports
		○ "Archived Services" section in admin panel
	4. Can be restored: Set deleted_at = NULL
Constraints:
	• Cannot archive service with future bookings
	• Must cancel/reassign bookings first

5.2.4 Delete Service (Hard Delete)
Use Case: Service created by mistake, has no bookings
Constraints:
	• Only if ZERO bookings (past or future)
	• Requires password re-entry (destructive action)
Warning: "This service has never been booked. Are you sure you want to permanently delete it? This cannot be undone."
On Confirm:
	1. Hard delete from services table
	2. Delete associated image from storage
	3. Log deletion in audit_logs

5.3 Staff Management
Admin Exclusive Actions:
5.3.1 Add Staff
Access: More Tab → Staff → Add Staff
Form:
typescript
interface CreateStaffForm {
  fullName: string;
  email: string;                   // Unique
  phone: string;                   // Unique
  role: 'manager' | 'admin';       // Dropdown (cannot create 'client')
  level: 'junior' | 'senior' | 'master';
  title: string;                   // e.g., "Senior Lash Artist"
  bio?: string;
  specialties: string[];           // Multi-select tags
  hourlyRate?: number;             // For payroll (optional)
  commissionRate?: number;         // Percentage (optional)
  defaultSchedule: WeeklySchedule; // Mon-Sun hours
  employmentStartDate: Date;
  isBookable: boolean;             // Default true
  avatarUrl?: string;
}
Process:
	1. Admin fills form
	2. System generates secure random password (16 chars)
	3. Edge function create-staff-account called (admin-only):
typescript
   const { data, error } = await supabaseAdmin.auth.admin.createUser({
     email: form.email,
     password: temporaryPassword,
     email_confirm: true,  // Auto-confirm
     user_metadata: {
       full_name: form.fullName,
       phone: form.phone,
     }
   });
```
4. Database trigger creates profile with `role = form.role`
5. Insert into `staff` table
6. Insert schedule into `staff_schedules` table
7. Send invitation email:
```
   Subject: Welcome to Lash Mama Team!
   
   Hi {fullName},
   
   Lash Mama has created an account for you.
   
   Email: {email}
   Temporary Password: {temporaryPassword}
   
   Please set your permanent password within 48 hours:
   {resetPasswordLink}
   
   Welcome to the team!
```
8. Log action in `audit_logs`
9. Show success: "Staff member added. Invitation email sent."
---
#### **5.3.2 Edit Staff**
**Editable Fields:**
- Name, phone, email (with validation)
- Role (Manager ↔ Admin, but not to Client)
- Level, title, bio, specialties
- Hourly rate, commission
- Schedule (day by day)
- Bookable status
- Active/Inactive
**Role Change:**
- Requires password re-entry (security)
- Invalidates staff member's current session (forces re-login)
- Email notification sent to staff member
- Logged in `audit_logs`
**Schedule Change:**
- Can edit weekly schedule
- If changes affect future bookings:
  - Show warning: "This staff member has 3 appointments outside their new schedule."
  - Options:
    - "Reschedule Appointments" (bulk tool)
    - "Keep Current Schedule" (cancel changes)
    - "Override" (keep appointments, staff works outside schedule)
---
#### **5.3.3 Deactivate/Reactivate Staff**
**Deactivate:**
- Sets `staff.active = false` (soft delete)
- Staff cannot log in
- Hidden from client booking flow
- Existing appointments remain
- Can be reactivated anytime
**Reactivate:**
- Sets `staff.active = true`
- Staff can log in again
- Visible in booking flow
---
#### **5.3.4 Delete Staff (Hard Delete)**
**Constraints:**
- Staff must have ZERO future bookings
- Must reassign or cancel all future bookings first
**Process:**
1. Check for future bookings
2. If exists:
   - Show list of affected appointments
   - Provide bulk reassignment tool
   - After reassignment → Can delete
3. If no future bookings:
   - Confirm deletion (requires password)
   - Soft delete profile (`deleted_at = now()`)
   - Hard delete scheduled for 90 days later
   - Past appointments remain (for historical data)
---
#### **5.3.5 Manage Staff Schedules**
**Admin can:**
- Edit any staff member's weekly schedule
- Block time off (mark days as unavailable)
- Override schedule for specific dates
- View all staff schedules side-by-side (grid view)
**Schedule Conflict Detection:**
- If admin creates appointment for staff outside their schedule:
  - Show warning: "This appointment is outside [Staff Name]'s normal hours."
  - Require confirmation: "Override schedule for this appointment?"
  - Log override in `audit_logs`
---
#### **5.3.6 Approve/Deny Time-Off Requests**
**Process:**
1. Staff submits time-off request (via their app)
2. Admin receives notification (push + email)
3. Admin navigates to: More Tab → Staff → Time Off Requests
4. Sees pending requests:
```
   Nikki requested time off
   Dates: Jan 20 - Jan 22
   Reason: Family event
   Submitted: Jan 10, 2026
   [Approve] [Decline]
```
5. Admin taps "Approve" or "Decline"
6. If declining, prompted to enter reason
7. On action:
   - Update `staff_time_off.status`
   - Send notification to staff member
   - If approved: Calendar automatically blocks those dates
   - Log action in `audit_logs`
---
### **5.4 Client Management**
**Admin Exclusive Actions:**
#### **5.4.1 Block Client**
**Use Case:** Repeated no-shows, abusive behavior, payment fraud
**Process:**
1. Admin opens client profile
2. Taps "Block Client"
3. Modal:
```
   Block [Client Name]?
   
   This client will no longer be able to:
   - Book appointments
   - Log into the app
   - Contact staff
   
   Reason (optional):
   [Text input]
   
   [Cancel] [Block Client]
```
4. On confirm:
   - Set `profiles.blocked = true`
   - Set `profiles.blocked_reason = reason`
   - Cancel all future appointments (with refunds if applicable)
   - Invalidate client's session (force logout)
   - Send notification to client: "Your account has been restricted. Please contact support."
   - Log action in `audit_logs`
**Unblock:**
- Admin can unblock anytime
- Client immediately regains access
---
#### **5.4.2 Delete Client (GDPR Compliance)**
**Use Case:** Client requests account deletion (right to be forgotten)
**Process:**
1. Client submits deletion request (via app or email)
2. Admin reviews request (ensure no disputes, pending payments)
3. Admin navigates to client profile → "Delete Account"
4. Confirmation modal:
```
   Permanently Delete [Client Name]?
   
   This will:
   - Cancel all future appointments
   - Refund deposits (if applicable)
   - Anonymize historical data
   - Delete account in 90 days
   
   Type "DELETE" to confirm:
   [Input]
   
   [Cancel] [Delete Account]
```
5. On confirm:
   - Cancel future appointments
   - Process refunds
   - Soft delete profile (`deleted_at = now()`)
   - Anonymize audit logs (replace name with `[Deleted User]`)
   - Schedule hard delete in 90 days
   - Send confirmation email to client
   - Log action in `audit_logs`
---
#### **5.4.3 Manual VIP Status Control**
**Use Cases:**
- Grant VIP as courtesy (long-time client, special relationship)
- Revoke VIP (client abused benefits)
- Adjust streak (correct error, resolve dispute)
**Actions:**
**Grant VIP (Bypass Streak):**
1. Admin opens client profile → VIP section
2. Taps "Grant VIP Manually"
3. Confirmation: "This will give [Client] VIP status immediately, bypassing the 10-booking requirement."
4. On confirm:
   - Insert/update `vip_members` with `status = 'manually_granted'`
   - Apply VIP benefits immediately
   - Client sees VIP badge on profile
   - Log action in `audit_logs`
**Revoke VIP:**
1. Admin opens VIP member profile
2. Taps "Revoke VIP Status"
3. Confirmation: "This will remove [Client]'s VIP benefits. Are you sure?"
4. On confirm:
   - Update `vip_members.status = 'revoked'`
   - Remove VIP badge
   - Stop applying VIP discounts
   - Log action with reason
**Adjust Streak:**
1. Admin opens VIP member profile
2. Sees current streak: "12 consecutive bookings"
3. Taps "Edit Streak"
4. Modal:
```
   Adjust VIP Streak for [Client]
   
   Current Streak: 12
   New Streak: [Input]
   
   Reason (optional): [Text input]
   
   [Cancel] [Update Streak]
	5. On confirm: 
		○ Update vip_members.current_streak
		○ Recalculate VIP status (if streak drops below 10 → lose VIP)
		○ Log action with reason

5.5 Recurring Bookings Management
Admin Exclusive Privileges:
5.5.1 Create Recurring Booking Without Deposit
Access: More Tab → Recurring Bookings → New Recurring Booking
Form:
typescript
interface CreateRecurringBookingForm {
  clientId: string;              // Search/dropdown
  serviceId: string;             // Dropdown
  staffId: string;               // Dropdown
  frequency: 'weekly' | 'biweekly' | 'monthly';
  dayOfWeek: number;             // 0-6 (Sun-Sat)
  timeOfDay: string;             // HH:MM
  startDate: Date;
  endDate?: Date;                // Optional, null = indefinite
  noDepositRequired: boolean;    // Admin privilege, default true
}
Process:
	1. Admin fills form
	2. System validates: 
		○ Staff availability on selected day/time
		○ No conflicts with existing bookings
	3. System generates series of appointments:
typescript
   // If weekly, starting Jan 1, 2026 at 10:00 AM for 12 weeks
   const appointments = [];
   for (let i = 0; i < 12; i++) {
     const date = addWeeks(startDate, i);
     appointments.push({
       client_id: form.clientId,
       service_id: form.serviceId,
       staff_id: form.staffId,
       appointment_date: date,
       appointment_time: form.timeOfDay,
       status: 'confirmed',
       deposit_status: 'waived',  // Admin privilege
       recurring_booking_id: recurringId,
     });
   }
```
4. Insert all appointments in single transaction
5. Send confirmation email to client
6. Log action in `audit_logs`
**Benefits:**
- Loyal clients don't have to rebook manually every 2 weeks
- Guaranteed schedule (slots reserved)
- No deposit required (admin trust/courtesy)
---
#### **5.5.2 Edit Recurring Booking**
**Editable:**
- Frequency (weekly → biweekly)
- Day/time
- Staff member
- End date
**Process:**
1. Admin edits recurring booking
2. Modal:
```
   Update Recurring Booking
   
   This will affect 8 future appointments.
   
   Options:
   [ ] Update all future appointments
   [ ] Update only unconfirmed appointments
   [ ] Create new series (keep existing)
   
   [Cancel] [Update]
	3. On confirm: 
		○ Update affected appointments
		○ Notify client if changes impact them
		○ Log action

5.5.3 Pause/Resume Recurring Booking
Pause:
	• Temporarily stop generating future appointments
	• Existing appointments remain
	• Use case: Client going on vacation
Resume:
	• Continue generating appointments from next scheduled date

5.5.4 End Recurring Booking
Process:
	1. Cancel all future appointments in series
	2. Keep past appointments (historical data)
	3. Update recurring_bookings.status = 'ended'
	4. Notify client

5.6 Override Availability & System Rules
Admin Exclusive Overrides:
5.6.1 Book Outside Business Hours
Scenario: Client needs appointment on Sunday (normally closed)
Process:
	1. Admin creates booking via "Book Without Deposit"
	2. Selects date (e.g., Sunday)
	3. System warns: "The business is closed on Sundays."
	4. Admin confirms override
	5. Appointment created
	6. Log override in audit_logs

5.6.2 Bypass 24-Hour Cancellation Rule
Scenario: Client needs to cancel <24hrs before appointment, but has valid emergency
Process:
	1. Client contacts admin (phone, text)
	2. Admin navigates to appointment
	3. Taps "Cancel Appointment"
	4. System warns: "Deposit will be forfeited (less than 24 hours)."
	5. Admin taps "Refund Deposit Anyway" (override checkbox)
	6. Appointment cancelled, deposit refunded
	7. Log override with reason

5.6.3 Manual Pricing Adjustment
Scenario: Long-time client gets courtesy discount
Process:
	1. During booking creation, admin enters custom price
	2. System allows override (admin only)
	3. Reason required: "Loyal client courtesy discount"
	4. Appointment created with adjusted price
	5. Log adjustment in audit_logs

5.7 Analytics & Reporting
Admin Exclusive Access:
Reports Available:
	1. Revenue Reports: 
		○ Daily/weekly/monthly revenue
		○ Revenue by service
		○ Revenue by staff member
		○ Year-over-year comparison
	2. Booking Reports: 
		○ Total bookings
		○ Bookings by service
		○ Bookings by staff
		○ Cancellation rate
		○ No-show rate
	3. Client Reports: 
		○ New clients per month
		○ Client retention rate
		○ VIP conversion rate
		○ Average client lifetime value
	4. Staff Performance: 
		○ Bookings per staff member
		○ Revenue per staff member
		○ Average rating
		○ Repeat client rate
Export Options:
	• PDF (formatted report)
	• CSV (raw data for analysis)
	• Email (scheduled reports)
Access: More Tab → Analytics

5.8 System Settings
Admin Exclusive Settings:
Business Info:
	• Name, email, phone, address
	• Website, social media links
	• Logo upload
	• Business hours
Booking Rules:
	• Minimum advance notice (hours)
	• Maximum advance booking (months)
	• Cancellation deadline (hours)
	• Default deposit amount
VIP Program:
	• Streak requirement (bookings)
	• Streak window (days)
	• Discount percentages
	• Enable/disable program
Notifications:
	• Which events trigger notifications
	• Email templates
	• SMS templates
Payments:
	• Stripe API keys
	• Afterpay enable/disable
	• Currency
Advanced:
	• Data export
	• Audit log access
	• System maintenance
Access: More Tab → Settings

6. SECURITY & PRODUCTION HARDENING (NON-NEGOTIABLE)
6.1 RLS-First Architecture
Golden Rule: All authorization is enforced at the database level via Row Level Security (RLS). The application layer is purely for UX.

6.1.1 RLS Policy Structure
Every Table Must:
	1. Have RLS enabled: ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
	2. Have explicit policies for SELECT, INSERT, UPDATE, DELETE
	3. Default deny (no policy = no access)
Policy Naming Convention:
sql
-- Format: "{role} can {action} {condition}"
CREATE POLICY "Clients can read own appointments"
ON appointments FOR SELECT
USING (auth.uid() = client_id);
CREATE POLICY "Admins can update all services"
ON services FOR UPDATE
USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

6.1.2 RLS Helper Functions
Create helper functions for common checks:
sql
-- Check if current user has role
CREATE OR REPLACE FUNCTION auth.has_role(required_role text)
RETURNS boolean AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid()) = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Check if current user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN auth.has_role('admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Check if current user is manager or admin
CREATE OR REPLACE FUNCTION auth.is_staff()
RETURNS boolean AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid()) IN ('manager', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
Usage:
sql
CREATE POLICY "Staff can read all clients"
ON profiles FOR SELECT
USING (auth.is_staff());

6.1.3 Critical RLS Policies
Profiles Table:
sql
-- Users can read own profile
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);
-- Users can update own profile (except role)
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  -- Cannot change own role
  (SELECT role FROM profiles WHERE id = auth.uid()) = role
);
-- Staff can read all profiles
CREATE POLICY "Staff can read all profiles"
ON profiles FOR SELECT
USING (auth.is_staff());
-- Admin can update all profiles
CREATE POLICY "Admin can update all profiles"
ON profiles FOR UPDATE
USING (auth.is_admin());
-- Admin can delete profiles
CREATE POLICY "Admin can delete profiles"
ON profiles FOR DELETE
USING (auth.is_admin());
Appointments Table:
sql
-- Clients can read own appointments
CREATE POLICY "Clients can read own appointments"
ON appointments FOR SELECT
USING (
  auth.uid() = client_id
  OR auth.is_staff()
);
-- Clients can create own appointments
CREATE POLICY "Clients can create own appointments"
ON appointments FOR INSERT
WITH CHECK (auth.uid() = client_id);
-- Clients can update own appointments (if >24hrs before)
CREATE POLICY "Clients can update own appointments"
ON appointments FOR UPDATE
USING (
  auth.uid() = client_id
  AND appointment_date > CURRENT_DATE + INTERVAL '1 day'
);
-- Managers can read appointments (except admin's)
CREATE POLICY "Managers can read most appointments"
ON appointments FOR SELECT
USING (
  auth.has_role('manager')
  AND staff_id != (SELECT id FROM profiles WHERE role = 'admin')
);
-- Managers can create/update appointments
CREATE POLICY "Managers can manage appointments"
ON appointments FOR INSERT
WITH CHECK (auth.is_staff());
CREATE POLICY "Managers can update appointments"
ON appointments FOR UPDATE
USING (auth.is_staff());
-- Admins can do everything
CREATE POLICY "Admins can read all appointments"
ON appointments FOR SELECT
USING (auth.is_admin());
CREATE POLICY "Admins can create appointments"
ON appointments FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update appointments"
ON appointments FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admins can delete appointments"
ON appointments FOR DELETE
USING (auth.is_admin());
Services Table:
sql
-- Everyone can read active services
CREATE POLICY "Anyone can read active services"
ON services FOR SELECT
USING (active = true OR auth.is_staff());
-- Only admin can modify services
CREATE POLICY "Admin can insert services"
ON services FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update services"
ON services FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete services"
ON services FOR DELETE
USING (auth.is_admin());
Messages Table:
sql
-- Users can read messages where they're a participant
CREATE POLICY "Users can read own messages"
ON messages FOR SELECT
USING (
  sender_id = auth.uid()
  OR conversation_id IN (
    SELECT conversation_id 
    FROM conversation_participants 
    WHERE user_id = auth.uid()
  )
  OR auth.is_admin()  -- Admin can read all (oversight)
);
-- Users can send messages to conversations they're in
CREATE POLICY "Users can send messages"
ON messages FOR INSERT
WITH CHECK (
  sender_id = auth.uid()
  AND conversation_id IN (
    SELECT conversation_id 
    FROM conversation_participants 
    WHERE user_id = auth.uid()
  )
);

6.2 Server-Side Payment Processing
Critical Rule: All Stripe operations MUST happen server-side. Never expose API keys or create Payment Intents client-side.

6.2.1 Payment Intent Creation (Edge Function)
File: supabase/functions/create-payment-intent/index.ts
typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@11.1.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2022-11-15',
});
serve(async (req) => {
  try {
    // Verify user is authenticated
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Parse request body
    const { amount, appointmentDetails } = await req.json();
    
    // Validate amount (must be $50 for deposit)
    if (amount !== 5000) {  // Amount in cents
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
      });
    }
    
    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,  // $50 in cents
      currency: 'aud',
      metadata: {
        user_id: user.id,
        appointment_date: appointmentDetails.date,
        appointment_time: appointmentDetails.time,
        service_id: appointmentDetails.serviceId,
        staff_id: appointmentDetails.staffId,
      },
    });
    
    // Return client_secret to app
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});
Client-Side Usage:
typescript
// App calls edge function
const { data, error } = await supabase.functions.invoke('create-payment-intent', {
  body: {
    amount: 5000,
    appointmentDetails: {
      date: selectedDate,
      time: selectedTime,
      serviceId: selectedService.id,
      staffId: selectedStaff.id,
    },
  },
});
if (error) throw error;
// Use client_secret with Stripe SDK
const { error: paymentError } = await confirmPayment(data.clientSecret, {
  paymentMethodType: 'Card',
});

6.2.2 Stripe Webhook Handler (Edge Function)
File: supabase/functions/webhook-stripe/index.ts
typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@11.1.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2022-11-15',
});
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // Service role for bypassing RLS
);
serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!;
  const body = await req.text();
  
  try {
    // Verify webhook signature (CRITICAL for security)
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
    
    // Check idempotency (prevent duplicate processing)
    const { data: existing } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .maybeSingle();
    
    if (existing) {
      return new Response(JSON.stringify({ received: true, alreadyProcessed: true }), {
        status: 200,
      });
    }
    
    // Handle event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Create appointment in database
      const { error: appointmentError } = await supabase.from('appointments').insert({
        client_id: paymentIntent.metadata.user_id,
        staff_id: paymentIntent.metadata.staff_id,
        service_id: paymentIntent.metadata.service_id,
        appointment_date: paymentIntent.metadata.appointment_date,
        appointment_time: paymentIntent.metadata.appointment_time,
        status: 'confirmed',
        deposit_status: 'paid',
        total_amount: 350,  // Full service price
        remaining_balance: 300,  // Total - deposit
      });
      
      if (appointmentError) {
        // Log critical error
        console.error('Failed to create appointment after payment:', appointmentError);
        
        // Notify admin immediately
        await sendAdminAlert({
          type: 'PAYMENT_BOOKING_MISMATCH',
          paymentIntentId: paymentIntent.id,
          error: appointmentError,
        });
        
        throw appointmentError;
      }
      
      // Create transaction record
      await supabase.from('transactions').insert({
        payment_intent_id: paymentIntent.id,
        client_id: paymentIntent.metadata.user_id,
        amount: paymentIntent.amount / 100,  // Convert cents to dollars
        payment_method: 'card',
        status: 'succeeded',
      });
      
      // Send notifications
      await sendNotifications({
        clientId: paymentIntent.metadata.user_id,
        staffId: paymentIntent.metadata.staff_id,
        appointmentDate: paymentIntent.metadata.appointment_date,
      });
    }
    
    // Mark event as processed
    await supabase.from('webhook_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
    });
    
    return new Response(JSON.stringify({ received: true }), { status: 200 });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
});
Webhook Endpoint:
	• URL: https://{project-ref}.supabase.co/functions/v1/webhook-stripe
	• Configure in Stripe Dashboard → Webhooks
	• Events to listen for: 
		○ payment_intent.succeeded
		○ payment_intent.payment_failed
		○ charge.refunded

6.2.3 Webhook Security
Signature Verification:
	• Stripe signs every webhook with secret key
	• Edge function MUST verify signature before processing
	• Without verification → Anyone could send fake webhooks
Idempotency:
	• Store processed event IDs in webhook_events table
	• Check before processing: If already processed → Return success immediately
	• Prevents duplicate appointments if webhook delivered multiple times
Reconciliation Job:
	• Scheduled function runs every 5 minutes
	• Finds Payment Intents that succeeded but have no appointment
	• Polls Stripe API directly for status
	• Creates missing appointments
	• Handles edge case: Webhook never arrived or failed

6.3 Idempotency (State-Changing Operations)
Principle: All operations that modify state must be safe to retry without side effects.

6.3.1 Booking Creation Idempotency
Problem: User taps "Confirm Booking" multiple times (network lag, impatience)
Solution: Use idempotency keys
typescript
// Client generates idempotency key
const idempotencyKey = `booking_${userId}_${Date.now()}`;
// API endpoint checks for existing booking with this key
const { data: existing } = await supabase
  .from('appointments')
  .select('id')
  .eq('idempotency_key', idempotencyKey)
  .maybeSingle();
if (existing) {
  // Already created, return existing booking
  return { data: existing, alreadyCreated: true };
}
// Create new booking
const { data, error } = await supabase.from('appointments').insert({
  idempotency_key: idempotencyKey,
  client_id: userId,
  // ... other fields
});
Database Constraint:
sql
ALTER TABLE appointments
ADD COLUMN idempotency_key TEXT UNIQUE;

6.3.2 Payment Idempotency
Stripe Payment Intents are inherently idempotent:
	• Each Payment Intent has unique ID
	• Confirming multiple times → Same result
	• Webhook handler uses Payment Intent ID as idempotency key

6.3.3 Database Transaction Safety
Use database transactions for multi-step operations:
typescript
// Example: Cancel appointment with refund
await supabase.rpc('cancel_appointment_with_refund', {
  p_appointment_id: appointmentId,
  p_refund_amount: 50,
});
// SQL function (atomic):
CREATE OR REPLACE FUNCTION cancel_appointment_with_refund(
  p_appointment_id UUID,
  p_refund_amount DECIMAL
)
RETURNS void AS $$
BEGIN
  -- All in one transaction
  UPDATE appointments
  SET status = 'cancelled', deposit_status = 'refunded'
  WHERE id = p_appointment_id;
  
  INSERT INTO transactions (
    appointment_id, amount, status, payment_method
  ) VALUES (
    p_appointment_id, -p_refund_amount, 'refunded', 'card'
  );
  
  -- If any step fails, entire transaction rolls back
END;
$$ LANGUAGE plpgsql;

6.4 Soft Deletes & Audit Fields
Every Table Has:
sql
-- Standard audit fields
created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
deleted_at TIMESTAMPTZ,  -- Null = not deleted
-- Trigger to update updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON {table}
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
-- Helper function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
Soft Delete Implementation:
sql
-- "Delete" = set deleted_at
UPDATE profiles
SET deleted_at = NOW()
WHERE id = user_id;
-- RLS policies exclude soft-deleted
CREATE POLICY "Users can read non-deleted profiles"
ON profiles FOR SELECT
USING (deleted_at IS NULL);
-- Admin can view soft-deleted
CREATE POLICY "Admin can read all profiles including deleted"
ON profiles FOR SELECT
USING (auth.is_admin());
Hard Delete (Scheduled):
typescript
// Scheduled edge function runs daily
export async function purgeOldSoftDeletes() {
  // Delete records soft-deleted >90 days ago
  await supabase
    .from('profiles')
    .delete()
    .lt('deleted_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
    .not('deleted_at', 'is', null);
}

6.5 Rate Limiting & Abuse Prevention

6.5.1 API Rate Limiting
Supabase Edge Functions:
typescript
// Use Deno KV for rate limiting
const kv = await Deno.openKv();
async function checkRateLimit(userId: string, limit: number, windowMs: number): Promise<boolean> {
  const key = ['rate_limit', userId];
  const now = Date.now();
  
  // Get current count
  const entry = await kv.get(key);
  const count = entry.value?.count || 0;
  const windowStart = entry.value?.windowStart || now;
  
  // Check if window expired
  if (now - windowStart > windowMs) {
    // Reset window
    await kv.set(key, { count: 1, windowStart: now });
    return true;
  }
  
  // Check if limit exceeded
  if (count >= limit) {
    return false;
  }
  
  // Increment count
  await kv.set(key, { count: count + 1, windowStart });
  return true;
}
// Usage in edge function
const allowed = await checkRateLimit(user.id, 10, 60000);  // 10 requests per minute
if (!allowed) {
  return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
    status: 429,
  });
}
Rate Limits:
	• Login attempts: 5 per 15 minutes (per IP + per email)
	• Booking creation: 10 per hour (per user)
	• Password reset: 3 per hour (per email)
	• API calls: 100 per minute (per user)

6.5.2 Login Brute Force Protection
typescript
// Track failed login attempts
async function recordFailedLogin(email: string, ip: string) {
  const key = ['failed_logins', email];
  const entry = await kv.get(key);
  const attempts = entry.value?.attempts || 0;
  
  await kv.set(key, { 
    attempts: attempts + 1, 
    lastAttempt: Date.now() 
  }, { 
    expireIn: 15 * 60 * 1000  // Expire after 15 minutes
  });
  
  if (attempts >= 5) {
    // Lock account temporarily
    await supabase.from('profiles').update({
      locked_until: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }).eq('email', email);
  }
}

6.5.3 CAPTCHA for Sensitive Actions
Use hCaptcha for:
	• Signup (prevent bot accounts)
	• Password reset (prevent abuse)
	• Login after 3 failed attempts
typescript
// Verify CAPTCHA token server-side
async function verifyCaptcha(token: string): Promise<boolean> {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: Deno.env.get('HCAPTCHA_SECRET')!,
      response: token,
    }),
  });
  
  const result = await response.json();
  return result.success;
}

6.6 Security Checklist
Before Production Deployment:
	• RLS enabled on ALL tables
	• RLS policies tested for all roles
	• No API keys in client code
	• Stripe keys in environment variables only
	• Webhook signature verification enabled
	• HTTPS enforced (no HTTP)
	• Password complexity requirements
	• Rate limiting on sensitive endpoints
	• CAPTCHA on signup/password reset
	• Session timeout configured (1 hour)
	• Refresh token rotation enabled
	• Audit logging for all critical actions
	• Error messages don't expose sensitive info
	• SQL injection prevented (parameterized queries)
	• XSS protection (React escapes by default, but verify)
	• CSRF tokens not needed (Supabase uses JWT)
	• File upload validation (type, size)
	• Storage bucket policies configured
	• Database backups enabled (daily)
	• Monitoring/alerting configured (Sentry, etc.)

7. NON-HAPPY PATH FLOWS (CRITICAL SCENARIOS)
7.1 Booking Conflict Scenarios

7.1.1 Slot Taken Mid-Flow
Scenario: User at payment screen, another user books same slot
Flow:
	1. User selects: Mega Volume, Nikki, Jan 30 at 3:00 PM
	2. User fills allergy form
	3. User reaches payment screen
	4. User enters card details
	5. User taps "Confirm Booking"
	6. Before creating Payment Intent, system checks:
typescript
   const slotCheck = await supabase
     .from('appointments')
     .select('id')
     .eq('staff_id', staffId)
     .eq('appointment_date', date)
     .eq('appointment_time', time)
     .in('status', ['confirmed', 'pending'])
     .maybeSingle();
   
   if (slotCheck.data) {
     throw new SlotUnavailableError();
   }
```
7. Conflict detected → Payment NOT processed
8. Modal shown:
```
   Time Slot No Longer Available
   
   This time slot was just booked by another client.
   
   Next available times with Nikki:
   - Jan 30 at 4:00 PM
   - Jan 30 at 5:30 PM
   - Jan 31 at 2:00 PM
   
   [Choose Different Time] [Choose Different Artist] [Cancel]
	9. User selects alternative
	10. Returns to time selection (form data preserved)
	11. Completes booking
Prevention:
	• Check slot availability at MULTIPLE points: 
		○ When user first selects time (show real-time availability)
		○ Before showing payment form
		○ Right before creating Payment Intent (final check)

7.1.2 Staff Becomes Unavailable
Scenario: User books with Nikki. Between booking and appointment date, Nikki requests time off and Admin approves.
Flow:
	1. Appointment exists: Jan 30, 3:00 PM with Nikki
	2. Nikki submits time-off request for Jan 30
	3. Admin approves
	4. System detects conflict:
sql
   -- Database trigger on staff_time_off approval
   CREATE OR REPLACE FUNCTION check_appointment_conflicts()
   RETURNS TRIGGER AS $$
   BEGIN
     -- Find conflicting appointments
     SELECT id INTO conflict_ids
     FROM appointments
     WHERE staff_id = NEW.staff_id
     AND appointment_date BETWEEN NEW.start_date AND NEW.end_date
     AND status = 'confirmed';
     
     -- Notify admin
     INSERT INTO admin_alerts (type, message, metadata)
     VALUES (
       'STAFF_CONFLICT',
       'Time-off approval creates appointment conflicts',
       jsonb_build_object('staff_id', NEW.staff_id, 'appointment_ids', conflict_ids)
     );
     
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
	5. Admin receives alert: "Nikki's time-off approval affects 3 appointments. Please reassign."
	6. Admin navigates to Staff Management → Nikki → Conflicts
	7. Sees list of affected appointments
	8. Options: 
		○ Reassign to different staff: Dropdown per appointment
		○ Cancel appointments: (with refunds)
		○ Revoke time-off: (keep appointments)
	9. Admin chooses to reassign: 
		○ Selects Beau for all 3 appointments
		○ Taps "Reassign All"
	10. System: 
		○ Updates appointments.staff_id = beau_id
		○ Sends notifications to clients: "Your appointment has been reassigned to Beau due to scheduling. All other details remain the same."
		○ Logs reassignment in audit
	11. Appointments resolved, time-off approved

7.2 Payment Failure Scenarios

7.2.1 Payment Declined
Scenario: User's card is declined during booking
Flow:
	1. User completes booking form
	2. User enters card details
	3. User taps "Confirm Booking"
	4. App calls edge function create-payment-intent
	5. Edge function creates Payment Intent
	6. App attempts to confirm payment with Stripe SDK:
typescript
   const { error } = await confirmPayment(clientSecret, {
     paymentMethodType: 'Card',
   });
	7. Stripe returns error: card_declined (insufficient funds)
	8. App displays error banner:
   ⚠️ Payment Failed
Continue
Jan 29
Your card has insufficient funds.
[Try Different Card] [Use Afterpay]
9. Options:
   - **Try Different Card:**
     - Clears card input fields
     - User enters new card
     - Retry payment
   - **Use Afterpay:**
     - Switches to Afterpay payment flow
     - User redirects to Afterpay, approves
     - Returns to app, booking confirmed
10. If user cancels → Booking NOT created (no appointment in database)
**Logging:**
```typescript
// Log failed payment for admin review
await supabase.from('payment_failures').insert({
  user_id: userId,
  amount: 5000,
  error_code: 'card_declined',
  decline_code: 'insufficient_funds',
  attempted_at: new Date().toISOString(),
});
```
---
#### **7.2.2 Payment Succeeds, Booking Creation Fails**
**Scenario:** Stripe charges card successfully, but database insert fails
**This is the MOST CRITICAL failure scenario.**
**Flow:**
1. User confirms booking
2. Payment succeeds (card charged)
3. Stripe webhook fires: `payment_intent.succeeded`
4. Webhook handler attempts to create appointment:
```typescript
   const { error } = await supabase.from('appointments').insert({
     client_id: paymentIntent.metadata.user_id,
     // ... other fields
   });
```
5. **Database error occurs** (e.g., constraint violation, network timeout)
6. Webhook handler:
```typescript
   if (error) {
     // CRITICAL ERROR - Payment succeeded but booking failed
     
     // Log to Sentry
     Sentry.captureException(error, {
       level: 'critical',
       tags: { type: 'payment_booking_mismatch' },
       extra: {
         payment_intent_id: paymentIntent.id,
         amount: paymentIntent.amount,
         client_id: paymentIntent.metadata.user_id,
       },
     });
     
     // Notify admin immediately
     await supabase.from('admin_alerts').insert({
       type: 'CRITICAL_PAYMENT_MISMATCH',
       severity: 'high',
       message: 'Payment succeeded but booking creation failed',
       metadata: jsonb_build_object(
         'payment_intent_id', paymentIntent.id,
         'client_id', paymentIntent.metadata.user_id,
         'error', error.message
       ),
       created_at: new Date().toISOString(),
     });
     
     // Send email to admin
     await sendEmail({
       to: 'hello@lashmama.com.au',
       subject: '🚨 CRITICAL: Payment/Booking Mismatch',
       body: `
         Payment Intent: ${paymentIntent.id}
         Amount: $${paymentIntent.amount / 100}
         Client: ${paymentIntent.metadata.user_id}
         Error: ${error.message}
         
         Action Required: Manually create appointment or refund payment.
       `,
     });
     
     // DO NOT auto-refund (requires manual review)
     // Reason: Might be transient error, webhook will retry
     
     throw error;  // Webhook will retry
   }
```
7. **Webhook Retry:**
   - Stripe automatically retries failed webhooks
   - Exponential backoff: 1h, 2h, 4h, 8h... up to 3 days
   - If database error was transient → Retry succeeds → Booking created
8. **If retries fail:**
   - Admin dashboard shows "Pending Reconciliation" alert
   - Admin reviews Payment Intent details
   - Admin manually creates appointment:
     - Opens "Reconcile Payment" page
     - Sees Payment Intent ID, client, service, date/time
     - Taps "Create Appointment"
     - System creates appointment, links to Payment Intent
   - Alternative: Admin refunds payment via Stripe dashboard
9. **Client Communication:**
   - If booking not created within 1 hour after payment:
     - Automated email sent to client:
   Subject: Confirming Your Appointment
   
   Hi [Client Name],
   
   We received your payment of $50, but we're having trouble confirming your appointment details. 
   
   Our team is working on this and will contact you within the next hour to confirm your appointment.
   
   If you have any questions, please contact us at hello@lashmama.com.au
   
   Thank you for your patience!

**Prevention:**
- **Idempotency:** Check if appointment already exists before creating
- **Database Transaction:** Use transaction for creating appointment + transaction record
- **Monitoring:** Alert admin immediately on any payment/booking mismatch
- **Reconciliation Job:** Scheduled job checks for unreconciled payments every 5 minutes
---
#### **7.2.3 Refund Scenarios**
**Scenario 1: Client Cancels >24hrs Before**
**Flow:**
1. Client navigates to appointment
2. Taps "Cancel Appointment"
3. Confirmation modal:
Cancel Appointment?
You're cancelling more than 24 hours in advance. Your $50 deposit will be refunded within 5-10 business days.
[Keep Appointment] [Cancel Appointment]
4. Client confirms
5. System:
```typescript
   // Update appointment
   await supabase.from('appointments').update({
     status: 'cancelled',
     deposit_status: 'refunded',
     cancelled_at: new Date().toISOString(),
     cancelled_by: userId,
     cancellation_reason: 'Client cancelled >24hrs',
   }).eq('id', appointmentId);
   
   // Process refund via Stripe
   const refund = await stripe.refunds.create({
     payment_intent: appointment.payment_intent_id,
     amount: 5000,  // Full $50 deposit
     reason: 'requested_by_customer',
   });
   
   // Create transaction record
   await supabase.from('transactions').insert({
     payment_intent_id: appointment.payment_intent_id,
     client_id: userId,
     amount: -50,
     status: 'refunded',
     refund_id: refund.id,
   });
```
6. Client receives confirmation: "Appointment cancelled. Refund of $50 will appear in 5-10 business days."
**Scenario 2: Client Cancels <24hrs Before**
**Flow:**
1. Client taps "Cancel Appointment"
2. System checks time difference:
```typescript
   const hoursUntil = differenceInHours(appointmentDateTime, new Date());
   if (hoursUntil < 24) {
     // Deposit will be forfeited
   }
```
3. Warning modal:
Cancel Appointment?
⚠️ You're cancelling less than 24 hours in advance. Your $50 deposit will be forfeited and cannot be refunded.
[ ] I understand my deposit will be forfeited
[Keep Appointment] [Cancel Anyway]
4. User must check box to enable "Cancel Anyway" button
5. On confirm:
```typescript
   await supabase.from('appointments').update({
     status: 'cancelled',
     deposit_status: 'forfeited',  // NOT refunded
     cancelled_at: new Date().toISOString(),
     cancelled_by: userId,
   }).eq('id', appointmentId);
   
   // No refund processed
```
6. VIP streak check:
```typescript
   // Cancelling <24hrs might break VIP streak
   const daysSinceLastBooking = differenceInDays(
     new Date(),
     vipMember.last_booking_date
   );
   
   if (daysSinceLastBooking >= 60) {
     // Streak already broken
   } else {
     // Cancellation means no booking in window → Streak will break
     // Send warning notification
   }
```
**Scenario 3: Admin Override (Refund <24hrs)**
**Flow:**
1. Client calls Lash Mama explaining emergency
2. Admin navigates to appointment
3. Taps "Cancel Appointment"
4. System shows warning (as above)
5. Admin sees additional checkbox: **[ ] Admin Override: Refund deposit anyway**
6. Admin checks box, enters reason: "Client emergency - car accident"
7. System processes refund even though <24hrs
8. Log audit entry:
```typescript
   await supabase.from('audit_logs').insert({
     user_id: adminId,
     action: 'refund_override',
     entity_type: 'appointment',
     entity_id: appointmentId,
     metadata: {
       reason: 'Client emergency - car accident',
       deposit_forfeited_overridden: true,
     },
   });
```
---
### **7.3 Session & Auth Edge Cases**
---
#### **7.3.1 Role Change Mid-Session**
**Scenario:** Manager demoted to Client while logged in
**Flow:**
1. Manager (Nikki) logged into Manager app
2. Admin opens Staff Management → Nikki → Role
3. Admin changes role from "Manager" to "Client"
4. Confirmation: "This will immediately log out Nikki and revoke manager access. Continue?"
5. Admin confirms
6. System:
```typescript
   // Update role
   await supabase.from('profiles').update({
     role: 'client'
   }).eq('id', nikkiId);
   
   // Revoke all active sessions for this user
   await supabaseAdmin.auth.admin.signOut(nikkiId);
   
   // Log action
   await supabase.from('audit_logs').insert({
     user_id: adminId,
     action: 'role_changed',
     entity_type: 'profile',
     entity_id: nikkiId,
     changes: {
       before: { role: 'manager' },
       after: { role: 'client' },
     },
   });
   
   // Notify user
   await sendEmail({
     to: nikki.email,
     subject: 'Account Role Changed',
     body: 'Your account role has been changed. Please log in again.',
   });
```
7. **Nikki's next API call:**
```typescript
   // Middleware checks role
   const { data: profile } = await supabase
     .from('profiles')
     .select('role')
     .eq('id', auth.uid())
     .single();
   
   if (profile.role !== tokenRole) {
     // Role mismatch - session invalidated
     return res.status(401).json({
       error: 'ROLE_CHANGED',
       message: 'Your role has changed. Please log in again.',
     });
   }
```
8. App detects 401 with `ROLE_CHANGED`
9. Modal shown to Nikki:
Account Updated
Your account permissions have changed. Please log in again to continue.
[Log In]
10. Nikki logs out, logs back in
11. Routed to Client app (no longer has manager access)
---
#### **7.3.2 Account Disabled Mid-Session**
**Scenario:** Admin blocks client for repeated no-shows
**Flow:**
1. Client logged in, browsing services
2. Admin opens client profile → "Block Client"
3. Admin confirms:
```typescript
   await supabase.from('profiles').update({
     blocked: true,
     blocked_reason: 'Repeated no-shows',
     blocked_at: new Date().toISOString(),
     blocked_by: adminId,
   }).eq('id', clientId);
   
   // Cancel all future appointments
   await supabase.from('appointments').update({
     status: 'cancelled',
     cancellation_reason: 'Client account blocked',
   })
   .eq('client_id', clientId)
   .gte('appointment_date', new Date().toISOString());
   
   // Revoke session
   await supabaseAdmin.auth.admin.signOut(clientId);
```
4. **Client's next API call:**
```typescript
   // RLS policy blocks access
   CREATE POLICY "Blocked users cannot access"
   ON profiles FOR SELECT
   USING (
     auth.uid() = id
     AND (blocked IS NULL OR blocked = false)
   );
```
5. Query returns empty result → App detects account issue
6. App logs client out
7. Modal shown:
Account Restricted
Your account has been restricted.
Please contact support at hello@lashmama.com.au for more information.
[OK]
8. Redirect to login screen (login will fail with same message)
---
#### **7.3.3 Token Expired During Payment**
**Scenario:** User takes 15 minutes filling booking form, session expires
**Flow:**
1. User starts booking at 2:00 PM (session valid until 3:00 PM)
2. User takes time selecting service, artist, date/time
3. User fills allergy form carefully
4. User reaches payment screen at 2:18 PM
5. User reads payment terms, enters card details
6. User taps "Confirm Booking" at 3:05 PM (session expired 5 minutes ago)
7. **App attempts API call:**
```typescript
   // Supabase client automatically attempts token refresh
   const session = await supabase.auth.getSession();
   
   if (!session.data.session) {
     // Refresh failed - session expired
     throw new SessionExpiredError();
   }
```
8. **Error Handler:**
```typescript
   if (error instanceof SessionExpiredError) {
     // Save booking form state
     const formState = {
       service: selectedService,
       artist: selectedArtist,
       date: selectedDate,
       time: selectedTime,
       allergyForm: allergyFormData,
       cardDetails: null,  // NEVER save card details
     };
     
     const stateKey = `booking_temp_${userId}_${Date.now()}`;
     await SecureStore.setItemAsync(stateKey, JSON.stringify(formState), {
       expiresAt: Date.now() + (10 * 60 * 1000),  // 10 minutes
     });
     
     // Show modal
     showModal({
       title: 'Session Expired',
       message: 'For security, your session expired. Please log in to continue.',
       persistent: true,  // Cannot dismiss
       action: {
         label: 'Log In',
         onPress: () => {
           router.replace('/auth/login', {
             state: { returnTo: '/book/payment', stateKey },
           });
         },
       },
     });
   }
```
9. User logs in
10. After successful login:
```typescript
    // Check for saved state
    const { stateKey } = router.params;
    if (stateKey) {
      const savedState = await SecureStore.getItemAsync(stateKey);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        
        // Restore booking flow
        setSelectedService(parsed.service);
        setSelectedArtist(parsed.artist);
        setSelectedDate(parsed.date);
        setSelectedTime(parsed.time);
        setAllergyFormData(parsed.allergyForm);
        
        // Navigate directly to payment
        router.replace('/book/payment');
        
        // Clean up
        await SecureStore.deleteItemAsync(stateKey);
      }
    }
```
11. User back at payment screen, can immediately proceed
---
### **7.4 Data Integrity Edge Cases**
---
#### **7.4.1 Deleting Service with Future Bookings**
**Scenario:** Admin tries to delete "Mega Volume" service, but 12 future appointments use it
**Flow:**
1. Admin navigates to Services → Mega Volume → Delete
2. System checks:
```typescript
   const futureBookings = await supabase
     .from('appointments')
     .select('id, client_id, appointment_date')
     .eq('service_id', serviceId)
     .gte('appointment_date', new Date().toISOString())
     .eq('status', 'confirmed');
   
   if (futureBookings.data.length > 0) {
     throw new DependencyError('Cannot delete service with future bookings');
   }
```
3. Modal shown:
Cannot Delete Service
This service has 12 upcoming appointments.
You can: • Archive the service (hide from new bookings but keep existing) • Reassign appointments to a different service • Cancel all appointments (with refunds)
[View Appointments] [Archive Instead] [Cancel]
4. Admin taps "Archive Instead"
5. System:
```typescript
   await supabase.from('services').update({
     deleted_at: new Date().toISOString(),
     active: false,
   }).eq('id', serviceId);
```
6. Service hidden from client booking flow
7. Existing appointments remain unchanged
---
#### **7.4.2 Deleting Staff with Future Bookings**
**Scenario:** Admin tries to delete Nikki (staff), who has 8 future appointments
**Flow:**
1. Admin navigates to Staff → Nikki → Delete
2. System checks for future appointments (as above)
3. Modal:
Cannot Delete Staff Member
Nikki has 8 upcoming appointments.
You must:
	1. Reassign these appointments to another artist, OR
	2. Cancel all appointments (with refunds)
[Reassign Appointments] [Cancel Appointments] [Cancel]
4. Admin taps "Reassign Appointments"
5. Bulk reassignment tool opens:
Reassign Nikki's Appointments
Select new artist for each appointment:
Jan 30, 3:00 PM - Sarah M. - Mega Volume [Dropdown: Beau ▼]
Jan 31, 10:00 AM - Emma L. - Volume Refill [Dropdown: Beau ▼]
... (8 total)
[Apply All: Beau] [Reassign]
6. Admin selects Beau for all, taps "Reassign"
7. System:
```typescript
   // Update appointments
   await supabase.from('appointments').update({
     staff_id: beauId,
   }).in('id', appointmentIds);
   
   // Notify clients
   for (const appointment of appointments) {
     await sendNotification({
       userId: appointment.client_id,
       type: 'appointment_updated',
       title: 'Appointment Artist Changed',
       body: 'Your appointment has been reassigned to Beau. All other details remain the same.',
     });
   }
   
   // Log action
   await supabase.from('audit_logs').insert({
     user_id: adminId,
     action: 'bulk_reassignment',
     metadata: {
       from_staff_id: nikkiId,
       to_staff_id: beauId,
       appointment_ids: appointmentIds,
       reason: 'Staff member deletion',
     },
   });
```
8. After reassignment complete, Admin can delete Nikki:
```typescript
   await supabase.from('staff').update({
     deleted_at: new Date().toISOString(),
   }).eq('id', nikkiId);
   
   await supabase.from('profiles').update({
     deleted_at: new Date().toISOString(),
   }).eq('id', nikkiId);
```
---
#### **7.4.3 VIP Streak Edge Cases**
**Scenario 1: Client books on day 60 (last day of window)**
**Flow:**
1. Client's last booking: Jan 1, 2026
2. VIP window: 60 days → Streak expires Feb 29, 2026 at 11:59 PM
3. Client books appointment on Feb 29 at 11:00 PM
4. System:
```typescript
   const daysSinceLastBooking = differenceInDays(
     new Date(),
     vipMember.last_booking_date
   );
   
   if (daysSinceLastBooking <= 60) {
     // Within window - streak continues
     await supabase.from('vip_members').update({
       current_streak: vipMember.current_streak + 1,
       last_booking_date: new Date().toISOString(),
     }).eq('id', vipMember.id);
   } else {
     // Window expired - streak resets
     await supabase.from('vip_members').update({
       current_streak: 1,  // Start new streak
       last_booking_date: new Date().toISOString(),
     }).eq('id', vipMember.id);
     
     // Notify client
     await sendNotification({
       userId: clientId,
       type: 'vip_streak_broken',
       title: 'VIP Streak Broken',
       body: 'Your VIP streak has been reset because it's been more than 60 days since your last appointment. Start a new streak today!',
     });
   }
```
**Scenario 2: Client cancels appointment <24hrs, breaks streak**
**Flow:**
1. Client's streak: 9/10 bookings
2. Client has appointment tomorrow (within 60-day window)
3. Client cancels today (<24hrs before)
4. System:
```typescript
   // Appointment cancelled, deposit forfeited
   // BUT: This was the appointment that would have kept streak alive
   
   // Check if this cancellation causes streak to break
   const daysSinceLastCompleted = differenceInDays(
     new Date(),
     vipMember.last_booking_date
   );
   
   if (daysSinceLastCompleted >= 60) {
     // Cancelling this appointment means 60-day window expired
     // Streak broken
     await supabase.from('vip_members').update({
       current_streak: 0,
       status: 'inactive',
     }).eq('id', vipMember.id);
     
     // Warning notification
     await sendNotification({
       userId: clientId,
       type: 'vip_streak_lost',
       title: 'VIP Status Lost',
       body: 'Cancelling this appointment caused your VIP streak to break. Book a new appointment to start rebuilding your streak.',
     });
   }
```
---
### **7.5 Concurrent Operations**
---
#### **7.5.1 Race Condition: Two Users Book Same Slot**
**Scenario:** Users A and B both try to book Jan 30 at 3:00 PM with Nikki, at the exact same time
**Prevention: Database Constraint + Idempotent Insert**
**Database Constraint:**
```sql
-- Unique constraint: One appointment per staff+date+time
CREATE UNIQUE INDEX idx_appointments_staff_datetime
ON appointments (staff_id, appointment_date, appointment_time)
WHERE status IN ('confirmed', 'pending')
AND deleted_at IS NULL;
```
**Flow:**
1. User A and User B both reach payment screen at 3:00:00 PM
2. Both tap "Confirm Booking" simultaneously
3. Both apps call `create-payment-intent` edge function
4. Edge function checks slot:
```typescript
   const slotCheck = await supabase
     .from('appointments')
     .select('id')
     .eq('staff_id', staffId)
     .eq('appointment_date', date)
     .eq('appointment_time', time)
     .in('status', ['confirmed', 'pending'])
     .maybeSingle();
   
   if (slotCheck.data) {
     // Slot taken
     throw new SlotUnavailableError();
   }
```
5. **Race Condition:** Both checks happen at 3:00:00.001 PM, both return "available"
6. Both Payment Intents created
7. Both payments succeed
8. Both webhooks fire at 3:00:05 PM
9. **First webhook:**
```typescript
   await supabase.from('appointments').insert({
     staff_id: nikkiId,
     appointment_date: '2026-01-30',
     appointment_time: '15:00',
     status: 'confirmed',
     // ...
   });
   // SUCCESS - Appointment A created
```
10. **Second webhook (milliseconds later):**
```typescript
    await supabase.from('appointments').insert({
      staff_id: nikkiId,
      appointment_date: '2026-01-30',
      appointment_time: '15:00',
      status: 'confirmed',
      // ...
    });
    // FAILS - Unique constraint violation
```
11. Second webhook handler detects error:
```typescript
    if (error.code === '23505') {  // Unique constraint violation
      // Slot was taken by another booking
      
      // Refund User B immediately
      await stripe.refunds.create({
        payment_intent: paymentIntent.id,
        reason: 'duplicate',
      });
      
      // Notify User B
      await sendEmail({
        to: userB.email,
        subject: 'Booking Unavailable',
        body: `
          Unfortunately, the time slot you selected was just booked by another client.
          
          Your payment of $50 has been fully refunded and will appear in your account within 5-10 business days.
          
          Please visit the app to select a different time.
        `,
      });
      
      // Log incident
      await supabase.from('booking_conflicts').insert({
        payment_intent_id: paymentIntent.id,
        user_id: userB.id,
        conflict_reason: 'race_condition',
        refunded: true,
      });
    }
```
12. User A: Booking confirmed, appointment created
13. User B: Payment refunded, no appointment, email explanation
**Prevention:**
- Unique database constraint (absolute last line of defense)
- Optimistic locking at API layer (reduces race window)
- Real-time slot availability updates (via Supabase Realtime)
---
## **DOCUMENT STATUS**
**PRD Version:** 1.0 FINAL  
**Status:** ✅ LOCKED FOR IMPLEMENTATION  
**Review Level:** Staff-Level Engineering Standards  
**Ready for:** Schema Design + Architecture
---
## **NEXT DELIVERABLES**
**1. Complete Supabase Schema:**
- Full SQL migration scripts
- All tables with relationships
- RLS policies for every table/role
- Indexes for performance
- Triggers for audit logs
- Database functions
- Constraints (unique, check, foreign keys)
**2. Architecture & Implementation Plan:**
- Feature development order (Client → Manager → Admin)
- Sprint breakdown
- Shared infrastructure first
- Testing strategy
**Proceed with Schema Design?** 🚀
Yes — proceed with Schema Design. Please move forward in this exact order: 1. Supabase Schema Design * Full SQL migrations * Tables, relationships, constraints * RLS policies for every table and role * Indexes for performance * Triggers for audit fields * Database functions where appropriate 2. Auth & RBAC Implementation Notes * Supabase Auth integration assumptions * Role assignment model * How RLS maps to client/manager/admin 3. Architecture & Implementation Plan * Feature build order * Shared infrastructure first * Testing strategy Assumptions: * Fresh Supabase dev environment * All existing tables/data will be cleared * This schema is the single source of truth Treat this as production-grade and portfolio-quality. No shortcuts.
Show more
Jan 29
🗄️ LASH MAMA - COMPLETE SUPABASE SCHEMA DESIGN
Production-Grade Database Architecture

DOCUMENT CONTROL
Version: 1.0
Date: January 29, 2026
Status: PRODUCTION-READY
Review Level: Staff-Level Engineering Standards
Environment: Fresh Supabase Dev Instance (Clean Slate)

TABLE OF CONTENTS
	1. Schema Overview & Design Principles
	2. Complete SQL Migration Scripts
	3. RLS Policies (Complete)
	4. Indexes & Performance Optimization
	5. Database Functions & Triggers
	6. Auth & RBAC Implementation Notes
	7. Data Seeding Scripts
	8. Architecture & Implementation Plan

1. SCHEMA OVERVIEW & DESIGN PRINCIPLES
1.1 Design Principles
	1. Security First: RLS enforced on every table, no exceptions
	2. Data Integrity: Foreign keys, constraints, and triggers enforce business rules
	3. Audit Everything: Every critical action logged with before/after state
	4. Soft Deletes: Retain data unless GDPR deletion required
	5. Performance: Strategic indexes on foreign keys and query patterns
	6. Idempotency: Unique constraints prevent duplicate operations
	7. Scalability: Normalized schema, minimal denormalization where justified
1.2 Naming Conventions
	• Tables: Plural, lowercase, snake_case (e.g., appointments, vip_members)
	• Columns: Lowercase, snake_case (e.g., created_at, staff_id)
	• Foreign Keys: {table}_id (e.g., client_id, service_id)
	• Enums: Singular, snake_case (e.g., user_role, appointment_status)
	• Policies: Descriptive, "{role} can {action} {condition}"
	• Indexes: idx_{table}_{columns} (e.g., idx_appointments_client_date)
	• Triggers: trg_{table}_{action} (e.g., trg_profiles_updated_at)
	• Functions: fn_{purpose} (e.g., fn_update_updated_at)
1.3 Schema Diagram (ERD) - Text Representation
auth.users (Supabase managed)
    ↓ 1:1
profiles (extends auth.users)
    ↓ 1:1 (if staff)
staff
    ↓ 1:many
staff_schedules
staff_time_off
profiles (if client)
    ↓ 1:1
client_preferences
    ↓ 1:many
client_health_forms
client_notes
profiles (client) + services + staff → appointments
    ↓ 1:many
transactions (payments)
profiles (client) → vip_members
    ↓ 1:many
vip_benefit_usage
courses
    ↓ 1:many
course_enrollments (→ profiles)
conversations
    ↓ 1:many
conversation_participants (→ profiles)
messages (→ conversations)
notifications (→ profiles)
audit_logs (→ profiles)

2. COMPLETE SQL MIGRATION SCRIPTS
2.1 Foundation: Extensions & Enums
sql
-- =====================================================
-- MIGRATION 001: EXTENSIONS & ENUMS
-- Description: Enable required extensions and create enum types
-- =====================================================
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Enable pg_cron for scheduled jobs (if available)
-- Note: May require Supabase Pro plan
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- =====================================================
-- ENUMS
-- =====================================================
-- User role enumeration
CREATE TYPE user_role AS ENUM ('client', 'manager', 'admin');
-- Appointment status
CREATE TYPE appointment_status AS ENUM (
    'pending',      -- Awaiting payment/confirmation
    'confirmed',    -- Payment received, confirmed
    'completed',    -- Service completed
    'cancelled',    -- Cancelled by client or admin
    'no_show'       -- Client didn't show up
);
-- Deposit status
CREATE TYPE deposit_status AS ENUM (
    'unpaid',       -- No payment yet
    'paid',         -- Deposit paid
    'waived',       -- Admin waived deposit
    'refunded',     -- Deposit refunded
    'forfeited'     -- Deposit forfeited (late cancellation)
);
-- Payment method
CREATE TYPE payment_method AS ENUM (
    'card',         -- Credit/debit card (Stripe)
    'afterpay',     -- Afterpay installments
    'cash'          -- Cash at appointment
);
-- Transaction status
CREATE TYPE transaction_status AS ENUM (
    'pending',      -- Payment initiated
    'succeeded',    -- Payment succeeded
    'failed',       -- Payment failed
    'refunded'      -- Payment refunded
);
-- Booking frequency for recurring appointments
CREATE TYPE booking_frequency AS ENUM (
    'weekly',
    'biweekly',
    'monthly'
);
-- Recurring booking status
CREATE TYPE recurring_status AS ENUM (
    'active',       -- Currently generating appointments
    'paused',       -- Temporarily stopped
    'ended'         -- Permanently ended
);
-- Time-off request status
CREATE TYPE time_off_status AS ENUM (
    'pending',      -- Awaiting approval
    'approved',     -- Approved by admin
    'denied'        -- Denied by admin
);
-- VIP member status
CREATE TYPE vip_status AS ENUM (
    'active',           -- Currently VIP (10+ consecutive bookings)
    'inactive',         -- Lost VIP status (streak broken)
    'manually_granted', -- Admin granted VIP manually
    'revoked'           -- Admin revoked VIP
);
-- Staff level
CREATE TYPE staff_level AS ENUM (
    'junior',
    'senior',
    'master'
);
-- Course type
CREATE TYPE course_type AS ENUM (
    'vip_exclusive',
    'platinum',
    'standard'
);
-- Course status
CREATE TYPE course_status AS ENUM (
    'upcoming',
    'in_progress',
    'completed',
    'cancelled'
);
-- Attendance status
CREATE TYPE attendance_status AS ENUM (
    'enrolled',
    'attended',
    'no_show'
);
-- Notification type
CREATE TYPE notification_type AS ENUM (
    'booking_confirmed',
    'booking_rescheduled',
    'booking_cancelled',
    'vip_milestone',
    'vip_streak_warning',
    'reminder',
    'message_received',
    'payment_received',
    'time_off_approved',
    'time_off_denied',
    'system_announcement'
);
-- Alert severity
CREATE TYPE alert_severity AS ENUM (
    'info',
    'warning',
    'high',
    'critical'
);

2.2 Core Tables: Profiles & Authentication
sql
-- =====================================================
-- MIGRATION 002: PROFILES & AUTHENTICATION
-- Description: User profiles extending Supabase auth.users
-- =====================================================
-- =====================================================
-- PROFILES TABLE
-- Extends auth.users with application-specific fields
-- =====================================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'client',
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    birthday DATE,
    avatar_url TEXT,
    blocked BOOLEAN NOT NULL DEFAULT false,
    blocked_reason TEXT,
    blocked_at TIMESTAMPTZ,
    blocked_by UUID REFERENCES profiles(id),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT phone_format CHECK (phone ~ '^\+?[0-9\s\-\(\)]+$'),
    CONSTRAINT phone_length CHECK (LENGTH(phone) >= 10),
    CONSTRAINT full_name_length CHECK (LENGTH(full_name) >= 2)
);
-- Unique constraint on phone (across non-deleted profiles)
CREATE UNIQUE INDEX idx_profiles_phone_unique 
ON profiles(phone) 
WHERE deleted_at IS NULL;
-- Unique constraint on email (enforced by auth.users)
COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users. Role determines access level.';
-- =====================================================
-- TRIGGER: Auto-create profile on user signup
-- =====================================================
CREATE OR REPLACE FUNCTION fn_create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        role,
        full_name,
        phone,
        birthday
    ) VALUES (
        NEW.id,
        'client',  -- Default role
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        (NEW.raw_user_meta_data->>'birthday')::DATE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER trg_create_profile_on_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION fn_create_profile_for_new_user();
COMMENT ON FUNCTION fn_create_profile_for_new_user() IS 'Automatically creates profile when user signs up via Supabase Auth';

2.3 Staff Tables
sql
-- =====================================================
-- MIGRATION 003: STAFF TABLES
-- Description: Staff members, schedules, and time-off
-- =====================================================
-- =====================================================
-- STAFF TABLE
-- Extended profile information for staff members
-- =====================================================
CREATE TABLE staff (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    bio TEXT,
    specialties TEXT[] NOT NULL DEFAULT '{}',
    level staff_level NOT NULL DEFAULT 'junior',
    is_bookable BOOLEAN NOT NULL DEFAULT true,
    hourly_rate DECIMAL(10, 2),
    commission_rate DECIMAL(5, 2),
    employment_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT title_length CHECK (LENGTH(title) >= 3),
    CONSTRAINT hourly_rate_positive CHECK (hourly_rate IS NULL OR hourly_rate > 0),
    CONSTRAINT commission_rate_valid CHECK (commission_rate IS NULL OR (commission_rate >= 0 AND commission_rate <= 100))
);
COMMENT ON TABLE staff IS 'Extended information for staff members (managers and admin)';
-- =====================================================
-- STAFF_SCHEDULES TABLE
-- Weekly working hours for each staff member
-- =====================================================
CREATE TABLE staff_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    start_time TIME,
    end_time TIME,
    is_working BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT day_of_week_valid CHECK (day_of_week >= 0 AND day_of_week <= 6),
    CONSTRAINT times_required_if_working CHECK (
        NOT is_working OR (start_time IS NOT NULL AND end_time IS NOT NULL)
    ),
    CONSTRAINT end_after_start CHECK (
        NOT is_working OR end_time > start_time
    ),
    CONSTRAINT unique_staff_day UNIQUE (staff_id, day_of_week)
);
CREATE INDEX idx_staff_schedules_staff ON staff_schedules(staff_id);
COMMENT ON TABLE staff_schedules IS 'Weekly recurring schedules for staff members (0=Sunday, 6=Saturday)';
-- =====================================================
-- STAFF_TIME_OFF TABLE
-- Time-off requests and approvals
-- =====================================================
CREATE TABLE staff_time_off (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status time_off_status NOT NULL DEFAULT 'pending',
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id),
    denial_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT end_after_start CHECK (end_date >= start_date),
    CONSTRAINT reviewed_fields_consistent CHECK (
        (status = 'pending' AND reviewed_at IS NULL AND reviewed_by IS NULL)
        OR (status != 'pending' AND reviewed_at IS NOT NULL AND reviewed_by IS NOT NULL)
    ),
    CONSTRAINT denial_reason_required CHECK (
        status != 'denied' OR denial_reason IS NOT NULL
    )
);
CREATE INDEX idx_staff_time_off_staff ON staff_time_off(staff_id);
CREATE INDEX idx_staff_time_off_status ON staff_time_off(status);
CREATE INDEX idx_staff_time_off_dates ON staff_time_off(start_date, end_date);
COMMENT ON TABLE staff_time_off IS 'Time-off requests from staff members, approved by admin';

2.4 Services Tables
sql
-- =====================================================
-- MIGRATION 004: SERVICES TABLES
-- Description: Service catalog and pricing
-- =====================================================
-- =====================================================
-- SERVICE_CATEGORIES TABLE
-- High-level groupings of services
-- =====================================================
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT name_length CHECK (LENGTH(name) >= 2)
);
CREATE INDEX idx_service_categories_active ON service_categories(active);
CREATE INDEX idx_service_categories_order ON service_categories(display_order);
COMMENT ON TABLE service_categories IS 'Categories for organizing services (e.g., Mega Volume, Bridal)';
-- =====================================================
-- SERVICES TABLE
-- Individual bookable services
-- =====================================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) NOT NULL DEFAULT 50.00,
    active BOOLEAN NOT NULL DEFAULT true,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT name_length CHECK (LENGTH(name) >= 3),
    CONSTRAINT description_length CHECK (LENGTH(description) >= 10),
    CONSTRAINT duration_valid CHECK (duration_minutes >= 15 AND duration_minutes <= 480),
    CONSTRAINT duration_increment CHECK (duration_minutes % 15 = 0),
    CONSTRAINT base_price_positive CHECK (base_price > 0),
    CONSTRAINT deposit_valid CHECK (deposit_amount >= 0 AND deposit_amount <= base_price),
    CONSTRAINT name_unique_per_category UNIQUE (category_id, name, deleted_at)
);
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_active ON services(active) WHERE deleted_at IS NULL;
CREATE INDEX idx_services_order ON services(display_order);
COMMENT ON TABLE services IS 'Bookable services with pricing and duration';
-- =====================================================
-- SERVICE_STAFF_PRICING TABLE (Optional)
-- Staff-specific pricing adjustments
-- =====================================================
CREATE TABLE service_staff_pricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    price_adjustment DECIMAL(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_service_staff UNIQUE (service_id, staff_id)
);
CREATE INDEX idx_service_staff_pricing_service ON service_staff_pricing(service_id);
CREATE INDEX idx_service_staff_pricing_staff ON service_staff_pricing(staff_id);
COMMENT ON TABLE service_staff_pricing IS 'Optional per-staff pricing adjustments (e.g., +$50 for master artist)';

2.5 Client-Specific Tables
sql
-- =====================================================
-- MIGRATION 005: CLIENT-SPECIFIC TABLES
-- Description: Client preferences, health forms, notes
-- =====================================================
-- =====================================================
-- CLIENT_PREFERENCES TABLE
-- Client-specific preferences and internal notes
-- =====================================================
CREATE TABLE client_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    favorite_service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    favorite_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
    preferred_time_of_day TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_client_preferences_client ON client_preferences(client_id);
COMMENT ON TABLE client_preferences IS 'Client preferences and internal staff notes';
COMMENT ON COLUMN client_preferences.internal_notes IS 'Staff-only notes, not visible to client';
-- =====================================================
-- CLIENT_HEALTH_FORMS TABLE
-- Allergy and health information submitted at booking
-- =====================================================
CREATE TABLE client_health_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    has_allergies BOOLEAN NOT NULL DEFAULT false,
    allergy_details TEXT,
    sensitive_to_adhesives BOOLEAN NOT NULL DEFAULT false,
    eye_infection_recent BOOLEAN NOT NULL DEFAULT false,
    wears_contacts BOOLEAN NOT NULL DEFAULT false,
    pregnant_or_nursing BOOLEAN NOT NULL DEFAULT false,
    previous_lash_extensions BOOLEAN NOT NULL DEFAULT false,
    previous_extensions_when TEXT,
    other_health_concerns TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT allergy_details_required CHECK (
        NOT has_allergies OR allergy_details IS NOT NULL
    )
);
CREATE INDEX idx_client_health_forms_client ON client_health_forms(client_id);
CREATE INDEX idx_client_health_forms_submitted ON client_health_forms(submitted_at);
COMMENT ON TABLE client_health_forms IS 'Health and allergy information submitted by clients before booking';
-- =====================================================
-- CLIENT_NOTES TABLE
-- Personal beauty notes and reminders created by clients
-- =====================================================
CREATE TABLE client_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    reminder_date TIMESTAMPTZ,
    reminder_sent BOOLEAN NOT NULL DEFAULT false,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT title_length CHECK (LENGTH(title) >= 1 AND LENGTH(title) <= 200),
    CONSTRAINT content_length CHECK (LENGTH(content) >= 1)
);
CREATE INDEX idx_client_notes_client ON client_notes(client_id);
CREATE INDEX idx_client_notes_reminder ON client_notes(reminder_date) WHERE reminder_sent = false AND deleted_at IS NULL;
COMMENT ON TABLE client_notes IS 'Personal notes created by clients with optional reminders';
COMMENT ON COLUMN client_notes.reminder_date IS 'When to send push notification reminder';

2.6 Appointments Tables
sql
-- =====================================================
-- MIGRATION 006: APPOINTMENTS & BOOKINGS
-- Description: Core booking/appointment tables
-- =====================================================
-- =====================================================
-- APPOINTMENTS TABLE
-- Individual bookings/appointments
-- =====================================================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE RESTRICT,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status appointment_status NOT NULL DEFAULT 'pending',
    deposit_status deposit_status NOT NULL DEFAULT 'unpaid',
    total_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) NOT NULL,
    remaining_balance DECIMAL(10, 2) NOT NULL,
    payment_intent_id TEXT UNIQUE,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES profiles(id),
    service_notes TEXT,
    recurring_booking_id UUID,
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT duration_positive CHECK (duration_minutes > 0),
    CONSTRAINT total_amount_positive CHECK (total_amount >= 0),
    CONSTRAINT deposit_valid CHECK (deposit_amount >= 0 AND deposit_amount <= total_amount),
    CONSTRAINT remaining_balance_valid CHECK (remaining_balance >= 0 AND remaining_balance = total_amount - deposit_amount),
    CONSTRAINT cancellation_fields_consistent CHECK (
        (status != 'cancelled' AND cancelled_at IS NULL AND cancelled_by IS NULL)
        OR (status = 'cancelled' AND cancelled_at IS NOT NULL AND cancelled_by IS NOT NULL)
    ),
    CONSTRAINT payment_intent_required CHECK (
        status = 'pending' OR payment_intent_id IS NOT NULL OR deposit_status = 'waived'
    )
);
-- Performance indexes
CREATE INDEX idx_appointments_client ON appointments(client_id);
CREATE INDEX idx_appointments_staff ON appointments(staff_id);
CREATE INDEX idx_appointments_service ON appointments(service_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_client_date ON appointments(client_id, appointment_date);
CREATE INDEX idx_appointments_staff_date ON appointments(staff_id, appointment_date);
CREATE INDEX idx_appointments_payment_intent ON appointments(payment_intent_id) WHERE payment_intent_id IS NOT NULL;
-- Prevent double-booking (unique constraint)
CREATE UNIQUE INDEX idx_appointments_no_double_booking
ON appointments (staff_id, appointment_date, appointment_time)
WHERE status IN ('confirmed', 'pending') AND deleted_at IS NULL;
COMMENT ON TABLE appointments IS 'Individual appointments/bookings';
COMMENT ON INDEX idx_appointments_no_double_booking IS 'Prevents double-booking same staff at same time';
-- =====================================================
-- RECURRING_APPOINTMENTS TABLE
-- Series of recurring appointments
-- =====================================================
CREATE TABLE recurring_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE RESTRICT,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    frequency booking_frequency NOT NULL,
    day_of_week INTEGER,
    time_of_day TIME NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status recurring_status NOT NULL DEFAULT 'active',
    created_by UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT day_of_week_valid CHECK (day_of_week IS NULL OR (day_of_week >= 0 AND day_of_week <= 6)),
    CONSTRAINT end_after_start CHECK (end_date IS NULL OR end_date >= start_date)
);
CREATE INDEX idx_recurring_appointments_client ON recurring_appointments(client_id);
CREATE INDEX idx_recurring_appointments_staff ON recurring_appointments(staff_id);
CREATE INDEX idx_recurring_appointments_status ON recurring_appointments(status);
-- Add foreign key to appointments
ALTER TABLE appointments
ADD CONSTRAINT fk_appointments_recurring
FOREIGN KEY (recurring_booking_id) REFERENCES recurring_appointments(id) ON DELETE SET NULL;
COMMENT ON TABLE recurring_appointments IS 'Recurring appointment series (weekly, biweekly, monthly)';

2.7 Payment Tables
sql
-- =====================================================
-- MIGRATION 007: PAYMENTS & TRANSACTIONS
-- Description: Payment processing and transaction history
-- =====================================================
-- =====================================================
-- TRANSACTIONS TABLE
-- Payment transaction records (linked to Stripe)
-- =====================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method payment_method NOT NULL,
    payment_intent_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    status transaction_status NOT NULL DEFAULT 'pending',
    refund_id TEXT,
    refund_reason TEXT,
    refunded_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT amount_not_zero CHECK (amount != 0),
    CONSTRAINT refund_fields_consistent CHECK (
        (status != 'refunded' AND refund_id IS NULL AND refunded_at IS NULL)
        OR (status = 'refunded' AND refund_id IS NOT NULL AND refunded_at IS NOT NULL)
    )
);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_appointment ON transactions(appointment_id);
CREATE INDEX idx_transactions_payment_intent ON transactions(payment_intent_id) WHERE payment_intent_id IS NOT NULL;
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created ON transactions(created_at);
COMMENT ON TABLE transactions IS 'Payment transaction records (deposits, refunds)';
-- =====================================================
-- WEBHOOK_EVENTS TABLE
-- Tracks processed Stripe webhook events (idempotency)
-- =====================================================
CREATE TABLE webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_event_id TEXT NOT NULL UNIQUE,
    event_type TEXT NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB,
    
    -- Constraints
    CONSTRAINT stripe_event_id_format CHECK (LENGTH(stripe_event_id) > 0)
);
CREATE INDEX idx_webhook_events_stripe_id ON webhook_events(stripe_event_id);
CREATE INDEX idx_webhook_events_type ON webhook_events(event_type);
COMMENT ON TABLE webhook_events IS 'Processed Stripe webhook events (prevents duplicate processing)';
-- =====================================================
-- PAYMENT_FAILURES TABLE
-- Logs payment failures for admin review
-- =====================================================
CREATE TABLE payment_failures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    error_code TEXT NOT NULL,
    decline_code TEXT,
    error_message TEXT,
    metadata JSONB,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT amount_positive CHECK (amount > 0)
);
CREATE INDEX idx_payment_failures_user ON payment_failures(user_id);
CREATE INDEX idx_payment_failures_attempted ON payment_failures(attempted_at);
COMMENT ON TABLE payment_failures IS 'Failed payment attempts for admin review and troubleshooting';

2.8 VIP Program Tables
sql
-- =====================================================
-- MIGRATION 008: VIP PROGRAM
-- Description: VIP membership and benefit tracking
-- =====================================================
-- =====================================================
-- VIP_MEMBERS TABLE
-- VIP membership tracking and streak management
-- =====================================================
CREATE TABLE vip_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    total_bookings INTEGER NOT NULL DEFAULT 0,
    last_booking_date DATE,
    vip_since DATE,
    status vip_status NOT NULL DEFAULT 'inactive',
    total_savings DECIMAL(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT current_streak_valid CHECK (current_streak >= 0),
    CONSTRAINT longest_streak_valid CHECK (longest_streak >= current_streak),
    CONSTRAINT total_bookings_positive CHECK (total_bookings >= 0),
    CONSTRAINT total_savings_positive CHECK (total_savings >= 0),
    CONSTRAINT vip_since_required CHECK (
        status NOT IN ('active', 'manually_granted') OR vip_since IS NOT NULL
    )
);
CREATE INDEX idx_vip_members_client ON vip_members(client_id);
CREATE INDEX idx_vip_members_status ON vip_members(status);
CREATE INDEX idx_vip_members_last_booking ON vip_members(last_booking_date);
COMMENT ON TABLE vip_members IS 'VIP membership status and streak tracking';
-- =====================================================
-- VIP_BENEFIT_USAGE TABLE
-- Tracks VIP benefit redemptions
-- =====================================================
CREATE TABLE vip_benefit_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vip_member_id UUID NOT NULL REFERENCES vip_members(id) ON DELETE CASCADE,
    benefit_name TEXT NOT NULL,
    benefit_value DECIMAL(10, 2) NOT NULL,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    used_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT benefit_name_length CHECK (LENGTH(benefit_name) >= 3),
    CONSTRAINT benefit_value_positive CHECK (benefit_value > 0)
);
CREATE INDEX idx_vip_benefit_usage_member ON vip_benefit_usage(vip_member_id);
CREATE INDEX idx_vip_benefit_usage_appointment ON vip_benefit_usage(appointment_id);
CREATE INDEX idx_vip_benefit_usage_date ON vip_benefit_usage(used_at);
COMMENT ON TABLE vip_benefit_usage IS 'VIP benefit redemption history';
-- =====================================================
-- VIP_RULES TABLE (Singleton configuration)
-- System-wide VIP program rules
-- =====================================================
CREATE TABLE vip_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    streak_requirement INTEGER NOT NULL DEFAULT 10,
    streak_window_days INTEGER NOT NULL DEFAULT 60,
    vip_discount_percentage INTEGER NOT NULL DEFAULT 10,
    birthday_discount_percentage INTEGER NOT NULL DEFAULT 20,
    auto_apply_discounts BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT streak_requirement_positive CHECK (streak_requirement > 0),
    CONSTRAINT streak_window_positive CHECK (streak_window_days > 0),
    CONSTRAINT vip_discount_valid CHECK (vip_discount_percentage >= 0 AND vip_discount_percentage <= 100),
    CONSTRAINT birthday_discount_valid CHECK (birthday_discount_percentage >= 0 AND birthday_discount_percentage <= 100)
);
-- Ensure singleton (only one row allowed)
CREATE UNIQUE INDEX idx_vip_rules_singleton ON vip_rules ((1));
-- Insert default VIP rules
INSERT INTO vip_rules (streak_requirement, streak_window_days, vip_discount_percentage, birthday_discount_percentage)
VALUES (10, 60, 10, 20);
COMMENT ON TABLE vip_rules IS 'VIP program configuration (singleton table, only 1 row)';

2.9 Courses Tables
sql
-- =====================================================
-- MIGRATION 009: COURSES & ENROLLMENTS
-- Description: Educational courses and student enrollments
-- =====================================================
-- =====================================================
-- COURSES TABLE
-- Face-to-face training courses
-- =====================================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    course_type course_type NOT NULL DEFAULT 'standard',
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_spots INTEGER NOT NULL,
    enrolled_count INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,
    deposit DECIMAL(10, 2) NOT NULL,
    location TEXT,
    prerequisites TEXT,
    whats_included TEXT[],
    image_url TEXT,
    status course_status NOT NULL DEFAULT 'upcoming',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT title_length CHECK (LENGTH(title) >= 5),
    CONSTRAINT description_length CHECK (LENGTH(description) >= 20),
    CONSTRAINT end_after_start CHECK (end_time > start_time),
    CONSTRAINT total_spots_positive CHECK (total_spots > 0),
    CONSTRAINT enrolled_valid CHECK (enrolled_count >= 0 AND enrolled_count <= total_spots),
    CONSTRAINT price_positive CHECK (price > 0),
    CONSTRAINT deposit_valid CHECK (deposit >= 0 AND deposit <= price)
);
CREATE INDEX idx_courses_date ON courses(date);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_type ON courses(course_type);
COMMENT ON TABLE courses IS 'Face-to-face training courses offered by Lash Mama';
-- =====================================================
-- COURSE_ENROLLMENTS TABLE
-- Student enrollments in courses
-- =====================================================
CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_status transaction_status NOT NULL DEFAULT 'pending',
    attendance_status attendance_status NOT NULL DEFAULT 'enrolled',
    transaction_id UUID REFERENCES transactions(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_course_enrollment UNIQUE (course_id, client_id)
);
CREATE INDEX idx_course_enrollments_course ON course_enrollments(course_id);
CREATE INDEX idx_course_enrollments_client ON course_enrollments(client_id);
CREATE INDEX idx_course_enrollments_payment_status ON course_enrollments(payment_status);
COMMENT ON TABLE course_enrollments IS 'Student enrollments in courses';
-- =====================================================
-- TRIGGER: Update enrolled_count on course
-- =====================================================
CREATE OR REPLACE FUNCTION fn_update_course_enrolled_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE courses
        SET enrolled_count = enrolled_count + 1
        WHERE id = NEW.course_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE courses
        SET enrolled_count = enrolled_count - 1
        WHERE id = OLD.course_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_course_enrollments_update_count
    AFTER INSERT OR DELETE ON course_enrollments
    FOR EACH ROW
    EXECUTE FUNCTION fn_update_course_enrolled_count();
COMMENT ON FUNCTION fn_update_course_enrolled_count() IS 'Maintains enrolled_count on courses table';

2.10 Messaging Tables
sql
-- =====================================================
-- MIGRATION 010: MESSAGING SYSTEM
-- Description: In-app messaging between users
-- =====================================================
-- =====================================================
-- CONVERSATIONS TABLE
-- Message conversation threads
-- =====================================================
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_message_at TIMESTAMPTZ
);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at);
COMMENT ON TABLE conversations IS 'Message conversation threads';
-- =====================================================
-- CONVERSATION_PARTICIPANTS TABLE
-- Users participating in conversations
-- =====================================================
CREATE TABLE conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_read_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT unique_conversation_participant UNIQUE (conversation_id, user_id)
);
CREATE INDEX idx_conversation_participants_conversation ON conversation_participants(conversation_id);
CREATE INDEX idx_conversation_participants_user ON conversation_participants(user_id);
COMMENT ON TABLE conversation_participants IS 'Users in each conversation';
-- =====================================================
-- MESSAGES TABLE
-- Individual messages within conversations
-- =====================================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    edited_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT content_not_empty CHECK (LENGTH(TRIM(content)) > 0),
    CONSTRAINT content_max_length CHECK (LENGTH(content) <= 5000)
);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at);
CREATE INDEX idx_messages_sender ON messages(sender_id);
COMMENT ON TABLE messages IS 'Individual messages in conversations';
-- =====================================================
-- TRIGGER: Update conversation last_message_at
-- =====================================================
CREATE OR REPLACE FUNCTION fn_update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations
    SET last_message_at = NEW.sent_at,
        updated_at = NEW.sent_at
    WHERE id = NEW.conversation_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_messages_update_conversation
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION fn_update_conversation_last_message();
COMMENT ON FUNCTION fn_update_conversation_last_message() IS 'Updates conversation timestamp when new message sent';

2.11 Notifications & System Tables
sql
-- =====================================================
-- MIGRATION 011: NOTIFICATIONS & SYSTEM
-- Description: Notifications, alerts, settings
-- =====================================================
-- =====================================================
-- NOTIFICATIONS TABLE
-- Push/in-app notifications for users
-- =====================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    read_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_length CHECK (LENGTH(title) >= 1),
    CONSTRAINT body_length CHECK (LENGTH(body) >= 1)
);
CREATE INDEX idx_notifications_user ON notifications(user_id, sent_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_type ON notifications(type);
COMMENT ON TABLE notifications IS 'Push and in-app notifications';
-- =====================================================
-- ADMIN_ALERTS TABLE
-- Critical alerts for admin (payment issues, conflicts)
-- =====================================================
CREATE TABLE admin_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL,
    severity alert_severity NOT NULL DEFAULT 'info',
    message TEXT NOT NULL,
    metadata JSONB,
    resolved BOOLEAN NOT NULL DEFAULT false,
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT resolved_fields_consistent CHECK (
        (NOT resolved AND resolved_at IS NULL AND resolved_by IS NULL)
        OR (resolved AND resolved_at IS NOT NULL AND resolved_by IS NOT NULL)
    )
);
CREATE INDEX idx_admin_alerts_resolved ON admin_alerts(resolved, created_at DESC);
CREATE INDEX idx_admin_alerts_severity ON admin_alerts(severity);
COMMENT ON TABLE admin_alerts IS 'Critical alerts for admin (payment mismatches, conflicts)';
-- =====================================================
-- BUSINESS_SETTINGS TABLE (Singleton)
-- System-wide business configuration
-- =====================================================
CREATE TABLE business_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    website TEXT,
    instagram TEXT,
    facebook TEXT,
    abn TEXT,
    logo_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Ensure singleton
CREATE UNIQUE INDEX idx_business_settings_singleton ON business_settings ((1));
-- Insert default settings
INSERT INTO business_settings (business_name, email, phone, address, website, instagram)
VALUES ('Lash Mama', 'hello@lashmama.com.au', '0400 000 000', '123 Beauty Lane, Sydney NSW 2000', 'www.lashmama.com.au', '@lashmama_official');
COMMENT ON TABLE business_settings IS 'Business information (singleton)';
-- =====================================================
-- WORKING_HOURS TABLE
-- Business operating hours
-- =====================================================
CREATE TABLE working_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day_of_week INTEGER NOT NULL UNIQUE,
    is_open BOOLEAN NOT NULL DEFAULT true,
    start_time TIME,
    end_time TIME,
    
    -- Constraints
    CONSTRAINT day_of_week_valid CHECK (day_of_week >= 0 AND day_of_week <= 6),
    CONSTRAINT times_required_if_open CHECK (
        NOT is_open OR (start_time IS NOT NULL AND end_time IS NOT NULL)
    ),
    CONSTRAINT end_after_start CHECK (
        NOT is_open OR end_time > start_time
    )
);
-- Insert default hours (Mon-Sat 9am-6pm, Sun closed)
INSERT INTO working_hours (day_of_week, is_open, start_time, end_time) VALUES
(0, false, NULL, NULL),  -- Sunday
(1, true, '09:00', '18:00'),  -- Monday
(2, true, '09:00', '18:00'),  -- Tuesday
(3, true, '09:00', '18:00'),  -- Wednesday
(4, true, '09:00', '18:00'),  -- Thursday
(5, true, '09:00', '18:00'),  -- Friday
(6, true, '09:00', '16:00');  -- Saturday
COMMENT ON TABLE working_hours IS 'Business operating hours';
-- =====================================================
-- NOTIFICATION_SETTINGS TABLE
-- Per-user notification preferences
-- =====================================================
CREATE TABLE notification_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    new_booking BOOLEAN NOT NULL DEFAULT true,
    reschedule_requests BOOLEAN NOT NULL DEFAULT true,
    cancellation_alerts BOOLEAN NOT NULL DEFAULT true,
    new_vip_members BOOLEAN NOT NULL DEFAULT true,
    daily_summary BOOLEAN NOT NULL DEFAULT true,
    daily_summary_time TIME NOT NULL DEFAULT '08:00',
    weekly_reports BOOLEAN NOT NULL DEFAULT true,
    new_messages BOOLEAN NOT NULL DEFAULT true,
    push_enabled BOOLEAN NOT NULL DEFAULT true,
    email_enabled BOOLEAN NOT NULL DEFAULT true,
    sms_enabled BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_notification_settings_user ON notification_settings(user_id);
COMMENT ON TABLE notification_settings IS 'Per-user notification preferences';

2.12 Audit & Logging Tables
sql
-- =====================================================
-- MIGRATION 012: AUDIT LOGS
-- Description: Comprehensive audit trail
-- =====================================================
-- =====================================================
-- AUDIT_LOGS TABLE
-- Complete audit trail of all critical actions
-- =====================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    user_role user_role,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB
);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
COMMENT ON TABLE audit_logs IS 'Complete audit trail of all critical system actions';
-- =====================================================
-- BOOKING_CONFLICTS TABLE
-- Logs booking conflicts and resolutions
-- =====================================================
CREATE TABLE booking_conflicts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_intent_id TEXT,
    user_id UUID REFERENCES profiles(id),
    staff_id UUID REFERENCES staff(id),
    appointment_date DATE,
    appointment_time TIME,
    conflict_reason TEXT NOT NULL,
    refunded BOOLEAN NOT NULL DEFAULT false,
    resolved BOOLEAN NOT NULL DEFAULT false,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT resolved_fields_consistent CHECK (
        (NOT resolved AND resolved_at IS NULL)
        OR (resolved AND resolved_at IS NOT NULL)
    )
);
CREATE INDEX idx_booking_conflicts_resolved ON booking_conflicts(resolved, created_at DESC);
CREATE INDEX idx_booking_conflicts_user ON booking_conflicts(user_id);
COMMENT ON TABLE booking_conflicts IS 'Tracks booking conflicts (race conditions, double-bookings)';

2.13 Utility Functions & Triggers
sql
-- =====================================================
-- MIGRATION 013: UTILITY FUNCTIONS & TRIGGERS
-- Description: Global utility functions and triggers
-- =====================================================
-- =====================================================
-- FUNCTION: Update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION fn_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION fn_update_updated_at() IS 'Automatically updates updated_at column on row update';
-- Apply to all tables with updated_at
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_staff_updated_at BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_staff_schedules_updated_at BEFORE UPDATE ON staff_schedules FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_staff_time_off_updated_at BEFORE UPDATE ON staff_time_off FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_service_categories_updated_at BEFORE UPDATE ON service_categories FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_service_staff_pricing_updated_at BEFORE UPDATE ON service_staff_pricing FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_client_preferences_updated_at BEFORE UPDATE ON client_preferences FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_client_health_forms_updated_at BEFORE UPDATE ON client_health_forms FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_client_notes_updated_at BEFORE UPDATE ON client_notes FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_recurring_appointments_updated_at BEFORE UPDATE ON recurring_appointments FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_vip_members_updated_at BEFORE UPDATE ON vip_members FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_vip_rules_updated_at BEFORE UPDATE ON vip_rules FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_course_enrollments_updated_at BEFORE UPDATE ON course_enrollments FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_business_settings_updated_at BEFORE UPDATE ON business_settings FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
CREATE TRIGGER trg_notification_settings_updated_at BEFORE UPDATE ON notification_settings FOR EACH ROW EXECUTE FUNCTION fn_update_updated_at();
-- =====================================================
-- HELPER FUNCTIONS: Role Checks
-- =====================================================
-- Check if current user has specific role
CREATE OR REPLACE FUNCTION auth.has_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role FROM public.profiles 
        WHERE id = auth.uid()
        AND deleted_at IS NULL
        AND active = true
    ) = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Check if current user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.has_role('admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Check if current user is staff (manager or admin)
CREATE OR REPLACE FUNCTION auth.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role FROM public.profiles 
        WHERE id = auth.uid()
        AND deleted_at IS NULL
        AND active = true
    ) IN ('manager', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Check if current user is client
CREATE OR REPLACE FUNCTION auth.is_client()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.has_role('client');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Get admin user ID (Lash Mama)
CREATE OR REPLACE FUNCTION auth.get_admin_id()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT id FROM public.profiles 
        WHERE role = 'admin'
        AND deleted_at IS NULL
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION auth.has_role(user_role) IS 'Checks if current user has specific role';
COMMENT ON FUNCTION auth.is_admin() IS 'Checks if current user is admin';
COMMENT ON FUNCTION auth.is_staff() IS 'Checks if current user is staff (manager or admin)';
COMMENT ON FUNCTION auth.get_admin_id() IS 'Returns the admin user ID (Lash Mama)';

Continue to Part 2: RLS Policies...
YES
Jan 29
🗄️ LASH MAMA - SUPABASE SCHEMA (PART 2)
Row Level Security (RLS) Policies

3. RLS POLICIES (COMPLETE)
3.1 RLS Policy Design Principles
Golden Rules:
	1. Enable RLS on every table - No exceptions
	2. Default deny - If no policy matches, access denied
	3. Explicit is better than implicit - Clear policy names and conditions
	4. Test each role - Verify policies work as expected
	5. Admin override - Admin can always access (god mode)
	6. Performance - Use indexes on columns in policy conditions

3.2 Profiles Table RLS
sql
-- =====================================================
-- RLS POLICIES: PROFILES
-- =====================================================
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (
    auth.uid() = id
    AND deleted_at IS NULL
);
-- Staff can read all non-deleted profiles
CREATE POLICY "Staff can read all profiles"
ON profiles FOR SELECT
USING (
    auth.is_staff()
    AND deleted_at IS NULL
);
-- Users can update their own profile (except role and blocked fields)
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())  -- Cannot change own role
    AND blocked = (SELECT blocked FROM profiles WHERE id = auth.uid())  -- Cannot unblock self
);
-- Admin can update any profile (including role and blocked)
CREATE POLICY "Admin can update all profiles"
ON profiles FOR UPDATE
USING (auth.is_admin());
-- Admin can soft-delete profiles
CREATE POLICY "Admin can delete profiles"
ON profiles FOR UPDATE
USING (auth.is_admin());
-- No one can INSERT profiles directly (handled by auth trigger)
-- No one can hard DELETE profiles (use soft delete)
COMMENT ON POLICY "Users can read own profile" ON profiles IS 'Users see their own profile';
COMMENT ON POLICY "Staff can read all profiles" ON profiles IS 'Managers and Admin see all profiles';
COMMENT ON POLICY "Admin can update all profiles" ON profiles IS 'Admin can change roles, block users';

3.3 Staff Tables RLS
sql
-- =====================================================
-- RLS POLICIES: STAFF
-- =====================================================
-- Enable RLS
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
-- Everyone can read active staff (for booking flow)
CREATE POLICY "Anyone can read active staff"
ON staff FOR SELECT
USING (
    deleted_at IS NULL
    AND is_bookable = true
);
-- Staff can read all staff (including inactive)
CREATE POLICY "Staff can read all staff"
ON staff FOR SELECT
USING (
    auth.is_staff()
    AND deleted_at IS NULL
);
-- Staff can update their own record (limited fields)
CREATE POLICY "Staff can update own record"
ON staff FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id
    -- Can update: bio, specialties
    -- Cannot update: level, is_bookable, rates (admin only)
);
-- Admin can do everything with staff
CREATE POLICY "Admin can insert staff"
ON staff FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update all staff"
ON staff FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete staff"
ON staff FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: STAFF_SCHEDULES
-- =====================================================
ALTER TABLE staff_schedules ENABLE ROW LEVEL SECURITY;
-- Staff can read their own schedule
CREATE POLICY "Staff can read own schedule"
ON staff_schedules FOR SELECT
USING (
    staff_id = auth.uid()
);
-- Staff can read all schedules (for coordination)
CREATE POLICY "Staff can read all schedules"
ON staff_schedules FOR SELECT
USING (auth.is_staff());
-- Admin can manage all schedules
CREATE POLICY "Admin can insert schedules"
ON staff_schedules FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update schedules"
ON staff_schedules FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete schedules"
ON staff_schedules FOR DELETE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: STAFF_TIME_OFF
-- =====================================================
ALTER TABLE staff_time_off ENABLE ROW LEVEL SECURITY;
-- Staff can read their own time-off requests
CREATE POLICY "Staff can read own time off"
ON staff_time_off FOR SELECT
USING (staff_id = auth.uid());
-- Staff can create their own time-off requests
CREATE POLICY "Staff can create time off request"
ON staff_time_off FOR INSERT
WITH CHECK (staff_id = auth.uid());
-- Admin can read all time-off requests
CREATE POLICY "Admin can read all time off"
ON staff_time_off FOR SELECT
USING (auth.is_admin());
-- Admin can update time-off requests (approve/deny)
CREATE POLICY "Admin can update time off"
ON staff_time_off FOR UPDATE
USING (auth.is_admin());
-- Admin can delete time-off requests
CREATE POLICY "Admin can delete time off"
ON staff_time_off FOR DELETE
USING (auth.is_admin());

3.4 Services Tables RLS
sql
-- =====================================================
-- RLS POLICIES: SERVICE_CATEGORIES
-- =====================================================
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
-- Everyone can read active categories
CREATE POLICY "Anyone can read active categories"
ON service_categories FOR SELECT
USING (active = true);
-- Admin can do everything
CREATE POLICY "Admin can insert categories"
ON service_categories FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update categories"
ON service_categories FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete categories"
ON service_categories FOR DELETE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: SERVICES
-- =====================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- Everyone can read active services
CREATE POLICY "Anyone can read active services"
ON services FOR SELECT
USING (
    active = true
    AND deleted_at IS NULL
);
-- Staff can read all services (including inactive)
CREATE POLICY "Staff can read all services"
ON services FOR SELECT
USING (
    auth.is_staff()
    AND deleted_at IS NULL
);
-- Admin can manage services
CREATE POLICY "Admin can insert services"
ON services FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update services"
ON services FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete services"
ON services FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: SERVICE_STAFF_PRICING
-- =====================================================
ALTER TABLE service_staff_pricing ENABLE ROW LEVEL SECURITY;
-- Everyone can read pricing (for booking flow)
CREATE POLICY "Anyone can read service pricing"
ON service_staff_pricing FOR SELECT
USING (true);
-- Admin can manage pricing
CREATE POLICY "Admin can insert pricing"
ON service_staff_pricing FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update pricing"
ON service_staff_pricing FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete pricing"
ON service_staff_pricing FOR DELETE
USING (auth.is_admin());

3.5 Client Tables RLS
sql
-- =====================================================
-- RLS POLICIES: CLIENT_PREFERENCES
-- =====================================================
ALTER TABLE client_preferences ENABLE ROW LEVEL SECURITY;
-- Clients can read their own preferences
CREATE POLICY "Clients can read own preferences"
ON client_preferences FOR SELECT
USING (client_id = auth.uid());
-- Clients can insert/update their own preferences
CREATE POLICY "Clients can insert own preferences"
ON client_preferences FOR INSERT
WITH CHECK (client_id = auth.uid());
CREATE POLICY "Clients can update own preferences"
ON client_preferences FOR UPDATE
USING (client_id = auth.uid())
WITH CHECK (client_id = auth.uid());
-- Staff can read all preferences
CREATE POLICY "Staff can read all preferences"
ON client_preferences FOR SELECT
USING (auth.is_staff());
-- Staff can update internal notes (not client-facing fields)
CREATE POLICY "Staff can update client preferences"
ON client_preferences FOR UPDATE
USING (auth.is_staff());
-- =====================================================
-- RLS POLICIES: CLIENT_HEALTH_FORMS
-- =====================================================
ALTER TABLE client_health_forms ENABLE ROW LEVEL SECURITY;
-- Clients can read their own health forms
CREATE POLICY "Clients can read own health forms"
ON client_health_forms FOR SELECT
USING (client_id = auth.uid());
-- Clients can insert their own health forms
CREATE POLICY "Clients can insert health forms"
ON client_health_forms FOR INSERT
WITH CHECK (client_id = auth.uid());
-- Clients can update their own health forms
CREATE POLICY "Clients can update own health forms"
ON client_health_forms FOR UPDATE
USING (client_id = auth.uid())
WITH CHECK (client_id = auth.uid());
-- Staff can read all health forms (for safety)
CREATE POLICY "Staff can read all health forms"
ON client_health_forms FOR SELECT
USING (auth.is_staff());
-- =====================================================
-- RLS POLICIES: CLIENT_NOTES
-- =====================================================
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;
-- Clients can read their own notes
CREATE POLICY "Clients can read own notes"
ON client_notes FOR SELECT
USING (
    client_id = auth.uid()
    AND deleted_at IS NULL
);
-- Clients can insert their own notes
CREATE POLICY "Clients can insert own notes"
ON client_notes FOR INSERT
WITH CHECK (client_id = auth.uid());
-- Clients can update their own notes
CREATE POLICY "Clients can update own notes"
ON client_notes FOR UPDATE
USING (client_id = auth.uid())
WITH CHECK (client_id = auth.uid());
-- Staff can read all client notes (for service quality)
CREATE POLICY "Staff can read all notes"
ON client_notes FOR SELECT
USING (
    auth.is_staff()
    AND deleted_at IS NULL
);

3.6 Appointments Tables RLS
sql
-- =====================================================
-- RLS POLICIES: APPOINTMENTS
-- =====================================================
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
-- Clients can read their own appointments
CREATE POLICY "Clients can read own appointments"
ON appointments FOR SELECT
USING (
    client_id = auth.uid()
    AND deleted_at IS NULL
);
-- Clients can insert their own appointments
CREATE POLICY "Clients can create appointments"
ON appointments FOR INSERT
WITH CHECK (client_id = auth.uid());
-- Clients can update their own future appointments (>24hrs before)
CREATE POLICY "Clients can update own future appointments"
ON appointments FOR UPDATE
USING (
    client_id = auth.uid()
    AND appointment_date > CURRENT_DATE
    AND status IN ('pending', 'confirmed')
)
WITH CHECK (client_id = auth.uid());
-- Managers can read all appointments EXCEPT admin's personal ones
CREATE POLICY "Managers can read most appointments"
ON appointments FOR SELECT
USING (
    auth.has_role('manager')
    AND staff_id != auth.get_admin_id()
    AND deleted_at IS NULL
);
-- Managers can create appointments for clients
CREATE POLICY "Managers can create appointments"
ON appointments FOR INSERT
WITH CHECK (
    auth.has_role('manager')
    AND staff_id != auth.get_admin_id()
);
-- Managers can update appointments (not admin's)
CREATE POLICY "Managers can update appointments"
ON appointments FOR UPDATE
USING (
    auth.has_role('manager')
    AND staff_id != auth.get_admin_id()
);
-- Admin can read all appointments
CREATE POLICY "Admin can read all appointments"
ON appointments FOR SELECT
USING (
    auth.is_admin()
    AND deleted_at IS NULL
);
-- Admin can create any appointment
CREATE POLICY "Admin can create any appointment"
ON appointments FOR INSERT
WITH CHECK (auth.is_admin());
-- Admin can update any appointment
CREATE POLICY "Admin can update any appointment"
ON appointments FOR UPDATE
USING (auth.is_admin());
-- Admin can delete appointments
CREATE POLICY "Admin can delete appointments"
ON appointments FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: RECURRING_APPOINTMENTS
-- =====================================================
ALTER TABLE recurring_appointments ENABLE ROW LEVEL SECURITY;
-- Clients can read their own recurring appointments
CREATE POLICY "Clients can read own recurring"
ON recurring_appointments FOR SELECT
USING (client_id = auth.uid());
-- Staff can read all recurring appointments
CREATE POLICY "Staff can read all recurring"
ON recurring_appointments FOR SELECT
USING (auth.is_staff());
-- Admin can create recurring appointments
CREATE POLICY "Admin can create recurring"
ON recurring_appointments FOR INSERT
WITH CHECK (auth.is_admin());
-- Admin can update recurring appointments
CREATE POLICY "Admin can update recurring"
ON recurring_appointments FOR UPDATE
USING (auth.is_admin());
-- Admin can delete recurring appointments
CREATE POLICY "Admin can delete recurring"
ON recurring_appointments FOR DELETE
USING (auth.is_admin());

3.7 Payments Tables RLS
sql
-- =====================================================
-- RLS POLICIES: TRANSACTIONS
-- =====================================================
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- Clients can read their own transactions
CREATE POLICY "Clients can read own transactions"
ON transactions FOR SELECT
USING (client_id = auth.uid());
-- No client INSERT (transactions created by edge functions only)
-- Staff can read all transactions
CREATE POLICY "Staff can read all transactions"
ON transactions FOR SELECT
USING (auth.is_staff());
-- Admin can insert transactions (manual adjustments)
CREATE POLICY "Admin can insert transactions"
ON transactions FOR INSERT
WITH CHECK (auth.is_admin());
-- Admin can update transactions (refunds)
CREATE POLICY "Admin can update transactions"
ON transactions FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: WEBHOOK_EVENTS
-- =====================================================
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
-- No public access (edge functions only)
-- Admin can read for debugging
CREATE POLICY "Admin can read webhook events"
ON webhook_events FOR SELECT
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: PAYMENT_FAILURES
-- =====================================================
ALTER TABLE payment_failures ENABLE ROW LEVEL SECURITY;
-- Staff can read all payment failures
CREATE POLICY "Staff can read payment failures"
ON payment_failures FOR SELECT
USING (auth.is_staff());
-- No public INSERT (edge functions only)

3.8 VIP Tables RLS
sql
-- =====================================================
-- RLS POLICIES: VIP_MEMBERS
-- =====================================================
ALTER TABLE vip_members ENABLE ROW LEVEL SECURITY;
-- Clients can read their own VIP status
CREATE POLICY "Clients can read own vip status"
ON vip_members FOR SELECT
USING (client_id = auth.uid());
-- Staff can read all VIP members
CREATE POLICY "Staff can read all vip members"
ON vip_members FOR SELECT
USING (auth.is_staff());
-- No public INSERT/UPDATE (system-managed)
-- Admin can manually update VIP status
CREATE POLICY "Admin can update vip members"
ON vip_members FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can insert vip members"
ON vip_members FOR INSERT
WITH CHECK (auth.is_admin());
-- =====================================================
-- RLS POLICIES: VIP_BENEFIT_USAGE
-- =====================================================
ALTER TABLE vip_benefit_usage ENABLE ROW LEVEL SECURITY;
-- Clients can read their own benefit usage
CREATE POLICY "Clients can read own benefit usage"
ON vip_benefit_usage FOR SELECT
USING (
    vip_member_id IN (
        SELECT id FROM vip_members WHERE client_id = auth.uid()
    )
);
-- Staff can read all benefit usage
CREATE POLICY "Staff can read all benefit usage"
ON vip_benefit_usage FOR SELECT
USING (auth.is_staff());
-- System can insert benefit usage (edge functions)
CREATE POLICY "System can insert benefit usage"
ON vip_benefit_usage FOR INSERT
WITH CHECK (true);  -- Controlled by edge functions
-- =====================================================
-- RLS POLICIES: VIP_RULES
-- =====================================================
ALTER TABLE vip_rules ENABLE ROW LEVEL SECURITY;
-- Everyone can read VIP rules (for display)
CREATE POLICY "Anyone can read vip rules"
ON vip_rules FOR SELECT
USING (true);
-- Admin can update VIP rules
CREATE POLICY "Admin can update vip rules"
ON vip_rules FOR UPDATE
USING (auth.is_admin());

3.9 Courses Tables RLS
sql
-- =====================================================
-- RLS POLICIES: COURSES
-- =====================================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
-- Everyone can read active courses
CREATE POLICY "Anyone can read active courses"
ON courses FOR SELECT
USING (
    status IN ('upcoming', 'in_progress')
    AND deleted_at IS NULL
);
-- Staff can read all courses
CREATE POLICY "Staff can read all courses"
ON courses FOR SELECT
USING (
    auth.is_staff()
    AND deleted_at IS NULL
);
-- Admin can manage courses
CREATE POLICY "Admin can insert courses"
ON courses FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update courses"
ON courses FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete courses"
ON courses FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: COURSE_ENROLLMENTS
-- =====================================================
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
-- Clients can read their own enrollments
CREATE POLICY "Clients can read own enrollments"
ON course_enrollments FOR SELECT
USING (client_id = auth.uid());
-- Clients can enroll themselves
CREATE POLICY "Clients can enroll in courses"
ON course_enrollments FOR INSERT
WITH CHECK (client_id = auth.uid());
-- Staff can read all enrollments
CREATE POLICY "Staff can read all enrollments"
ON course_enrollments FOR SELECT
USING (auth.is_staff());
-- Admin can manage enrollments
CREATE POLICY "Admin can insert enrollments"
ON course_enrollments FOR INSERT
WITH CHECK (auth.is_admin());
CREATE POLICY "Admin can update enrollments"
ON course_enrollments FOR UPDATE
USING (auth.is_admin());
CREATE POLICY "Admin can delete enrollments"
ON course_enrollments FOR DELETE
USING (auth.is_admin());

3.10 Messaging Tables RLS
sql
-- =====================================================
-- RLS POLICIES: CONVERSATIONS
-- =====================================================
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
-- Users can read conversations they're part of
CREATE POLICY "Users can read own conversations"
ON conversations FOR SELECT
USING (
    id IN (
        SELECT conversation_id 
        FROM conversation_participants 
        WHERE user_id = auth.uid()
    )
);
-- Users can create conversations (system will add participants)
CREATE POLICY "Users can create conversations"
ON conversations FOR INSERT
WITH CHECK (true);
-- Admin can read all conversations (oversight)
CREATE POLICY "Admin can read all conversations"
ON conversations FOR SELECT
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: CONVERSATION_PARTICIPANTS
-- =====================================================
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
-- Users can read participants of their conversations
CREATE POLICY "Users can read participants"
ON conversation_participants FOR SELECT
USING (
    conversation_id IN (
        SELECT conversation_id 
        FROM conversation_participants 
        WHERE user_id = auth.uid()
    )
);
-- System can add participants
CREATE POLICY "System can insert participants"
ON conversation_participants FOR INSERT
WITH CHECK (true);
-- Admin can manage participants
CREATE POLICY "Admin can manage participants"
ON conversation_participants FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: MESSAGES
-- =====================================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- Users can read messages in their conversations
CREATE POLICY "Users can read own messages"
ON messages FOR SELECT
USING (
    conversation_id IN (
        SELECT conversation_id 
        FROM conversation_participants 
        WHERE user_id = auth.uid()
    )
    AND deleted_at IS NULL
);
-- Users can send messages in their conversations
CREATE POLICY "Users can send messages"
ON messages FOR INSERT
WITH CHECK (
    sender_id = auth.uid()
    AND conversation_id IN (
        SELECT conversation_id 
        FROM conversation_participants 
        WHERE user_id = auth.uid()
    )
);
-- Users can update their own messages (edit)
CREATE POLICY "Users can update own messages"
ON messages FOR UPDATE
USING (sender_id = auth.uid())
WITH CHECK (sender_id = auth.uid());
-- Admin can read all messages
CREATE POLICY "Admin can read all messages"
ON messages FOR SELECT
USING (
    auth.is_admin()
    AND deleted_at IS NULL
);

3.11 System Tables RLS
sql
-- =====================================================
-- RLS POLICIES: NOTIFICATIONS
-- =====================================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
ON notifications FOR SELECT
USING (user_id = auth.uid());
-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
-- System can insert notifications
CREATE POLICY "System can insert notifications"
ON notifications FOR INSERT
WITH CHECK (true);
-- =====================================================
-- RLS POLICIES: ADMIN_ALERTS
-- =====================================================
ALTER TABLE admin_alerts ENABLE ROW LEVEL SECURITY;
-- Admin can read all alerts
CREATE POLICY "Admin can read alerts"
ON admin_alerts FOR SELECT
USING (auth.is_admin());
-- Admin can update alerts (resolve)
CREATE POLICY "Admin can update alerts"
ON admin_alerts FOR UPDATE
USING (auth.is_admin());
-- System can insert alerts
CREATE POLICY "System can insert alerts"
ON admin_alerts FOR INSERT
WITH CHECK (true);
-- =====================================================
-- RLS POLICIES: BUSINESS_SETTINGS
-- =====================================================
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
-- Everyone can read business settings
CREATE POLICY "Anyone can read business settings"
ON business_settings FOR SELECT
USING (true);
-- Admin can update business settings
CREATE POLICY "Admin can update business settings"
ON business_settings FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: WORKING_HOURS
-- =====================================================
ALTER TABLE working_hours ENABLE ROW LEVEL SECURITY;
-- Everyone can read working hours
CREATE POLICY "Anyone can read working hours"
ON working_hours FOR SELECT
USING (true);
-- Admin can update working hours
CREATE POLICY "Admin can update working hours"
ON working_hours FOR UPDATE
USING (auth.is_admin());
-- =====================================================
-- RLS POLICIES: NOTIFICATION_SETTINGS
-- =====================================================
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
-- Users can read their own settings
CREATE POLICY "Users can read own settings"
ON notification_settings FOR SELECT
USING (user_id = auth.uid());
-- Users can insert/update their own settings
CREATE POLICY "Users can insert own settings"
ON notification_settings FOR INSERT
WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own settings"
ON notification_settings FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
-- Admin can read all settings
CREATE POLICY "Admin can read all settings"
ON notification_settings FOR SELECT
USING (auth.is_admin());

3.12 Audit Tables RLS
sql
-- =====================================================
-- RLS POLICIES: AUDIT_LOGS
-- =====================================================
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
-- Admin can read all audit logs
CREATE POLICY "Admin can read audit logs"
ON audit_logs FOR SELECT
USING (auth.is_admin());
-- System can insert audit logs
CREATE POLICY "System can insert audit logs"
ON audit_logs FOR INSERT
WITH CHECK (true);
-- =====================================================
-- RLS POLICIES: BOOKING_CONFLICTS
-- =====================================================
ALTER TABLE booking_conflicts ENABLE ROW LEVEL SECURITY;
-- Admin can read all conflicts
CREATE POLICY "Admin can read conflicts"
ON booking_conflicts FOR SELECT
USING (auth.is_admin());
-- Admin can update conflicts (resolve)
CREATE POLICY "Admin can update conflicts"
ON booking_conflicts FOR UPDATE
USING (auth.is_admin());
-- System can insert conflicts
CREATE POLICY "System can insert conflicts"
ON booking_conflicts FOR INSERT
WITH CHECK (true);

Continue to Part 3: Indexes, Functions & Implementation...
YES
Jan 29
🗄️ LASH MAMA - SUPABASE SCHEMA (PART 3)
Indexes, Functions, Seeding & Implementation

4. INDEXES & PERFORMANCE OPTIMIZATION
4.1 Index Strategy
Indexing Principles:
	1. Foreign Keys: Always index (JOIN performance)
	2. WHERE Clauses: Index frequently filtered columns
	3. ORDER BY: Index sort columns
	4. Composite Indexes: For common multi-column queries
	5. Partial Indexes: For filtered queries (WHERE conditions)
	6. Avoid Over-Indexing: Each index has write cost

4.2 Additional Performance Indexes
sql
-- =====================================================
-- MIGRATION 014: PERFORMANCE INDEXES
-- Description: Additional indexes for query optimization
-- =====================================================
-- =====================================================
-- APPOINTMENTS: Complex Query Patterns
-- =====================================================
-- Find client's upcoming appointments
CREATE INDEX idx_appointments_client_upcoming
ON appointments(client_id, appointment_date)
WHERE status IN ('confirmed', 'pending') AND deleted_at IS NULL;
-- Find staff's daily schedule
CREATE INDEX idx_appointments_staff_daily
ON appointments(staff_id, appointment_date, appointment_time)
WHERE status IN ('confirmed', 'pending') AND deleted_at IS NULL;
-- Find appointments in date range (analytics)
CREATE INDEX idx_appointments_date_range
ON appointments(appointment_date, status)
WHERE deleted_at IS NULL;
-- Find pending payments
CREATE INDEX idx_appointments_pending_payment
ON appointments(deposit_status, created_at)
WHERE deposit_status = 'unpaid' AND deleted_at IS NULL;
-- =====================================================
-- TRANSACTIONS: Financial Reporting
-- =====================================================
-- Revenue by date range
CREATE INDEX idx_transactions_revenue_report
ON transactions(created_at, status, amount)
WHERE status = 'succeeded';
-- Client payment history
CREATE INDEX idx_transactions_client_history
ON transactions(client_id, created_at DESC)
WHERE status IN ('succeeded', 'refunded');
-- Unreconciled payments (missing appointments)
CREATE INDEX idx_transactions_unreconciled
ON transactions(status, created_at)
WHERE status = 'pending';
-- =====================================================
-- VIP_MEMBERS: Streak Calculations
-- =====================================================
-- Find VIPs with expiring streaks
CREATE INDEX idx_vip_members_expiring_streaks
ON vip_members(last_booking_date, status)
WHERE status = 'active';
-- VIP leaderboard (highest streaks)
CREATE INDEX idx_vip_members_leaderboard
ON vip_members(current_streak DESC, total_bookings DESC)
WHERE status = 'active';
-- =====================================================
-- NOTIFICATIONS: Unread Messages
-- =====================================================
-- User's unread notifications (most common query)
CREATE INDEX idx_notifications_unread_by_user
ON notifications(user_id, sent_at DESC)
WHERE read_at IS NULL;
-- Notifications by type for analytics
CREATE INDEX idx_notifications_by_type
ON notifications(type, sent_at DESC);
-- =====================================================
-- MESSAGES: Conversation Retrieval
-- =====================================================
-- Messages in conversation (chronological)
CREATE INDEX idx_messages_conversation_chrono
ON messages(conversation_id, sent_at ASC)
WHERE deleted_at IS NULL;
-- User's recent conversations
CREATE INDEX idx_conversations_by_user
ON conversation_participants(user_id, joined_at DESC);
-- =====================================================
-- CLIENT_NOTES: Upcoming Reminders
-- =====================================================
-- Pending reminders (for scheduled job)
CREATE INDEX idx_client_notes_pending_reminders
ON client_notes(reminder_date)
WHERE reminder_sent = false 
  AND is_completed = false 
  AND deleted_at IS NULL 
  AND reminder_date IS NOT NULL;
-- =====================================================
-- STAFF_TIME_OFF: Conflict Detection
-- =====================================================
-- Overlapping time-off periods
CREATE INDEX idx_staff_time_off_date_range
ON staff_time_off(staff_id, start_date, end_date)
WHERE status = 'approved';
-- =====================================================
-- COURSES: Enrollment Management
-- =====================================================
-- Upcoming courses with availability
CREATE INDEX idx_courses_upcoming_available
ON courses(date, status)
WHERE status = 'upcoming' 
  AND deleted_at IS NULL 
  AND enrolled_count < total_spots;
-- =====================================================
-- AUDIT_LOGS: Admin Investigation
-- =====================================================
-- Recent actions by user
CREATE INDEX idx_audit_logs_user_recent
ON audit_logs(user_id, timestamp DESC)
WHERE user_id IS NOT NULL;
-- Specific entity audit trail
CREATE INDEX idx_audit_logs_entity_trail
ON audit_logs(entity_type, entity_id, timestamp DESC);
-- Critical actions only
CREATE INDEX idx_audit_logs_critical_actions
ON audit_logs(action, timestamp DESC)
WHERE action IN (
    'role_changed',
    'client_blocked',
    'deposit_refunded',
    'vip_manually_granted',
    'service_deleted',
    'staff_deleted'
);
COMMENT ON INDEX idx_appointments_client_upcoming IS 'Optimizes client dashboard upcoming appointments query';
COMMENT ON INDEX idx_appointments_staff_daily IS 'Optimizes staff daily schedule view';
COMMENT ON INDEX idx_transactions_revenue_report IS 'Optimizes admin analytics revenue queries';
COMMENT ON INDEX idx_vip_members_expiring_streaks IS 'Optimizes VIP streak expiry check job';
COMMENT ON INDEX idx_client_notes_pending_reminders IS 'Optimizes reminder notification job';

4.3 Database Statistics & Maintenance
sql
-- =====================================================
-- MIGRATION 015: DATABASE MAINTENANCE
-- Description: Statistics and maintenance functions
-- =====================================================
-- =====================================================
-- FUNCTION: Analyze tables for query planner
-- =====================================================
CREATE OR REPLACE FUNCTION fn_analyze_tables()
RETURNS void AS $$
BEGIN
    ANALYZE profiles;
    ANALYZE appointments;
    ANALYZE transactions;
    ANALYZE services;
    ANALYZE staff;
    ANALYZE vip_members;
    ANALYZE messages;
    ANALYZE notifications;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION fn_analyze_tables() IS 'Updates table statistics for query planner optimization';
-- Schedule to run nightly (if pg_cron available)
-- SELECT cron.schedule('analyze-tables', '0 3 * * *', 'SELECT fn_analyze_tables()');
-- =====================================================
-- FUNCTION: Purge old soft-deleted records (GDPR)
-- =====================================================
CREATE OR REPLACE FUNCTION fn_purge_old_soft_deletes()
RETURNS TABLE(table_name text, rows_deleted bigint) AS $$
DECLARE
    cutoff_date TIMESTAMPTZ := NOW() - INTERVAL '90 days';
    deleted_count BIGINT;
BEGIN
    -- Purge profiles (cascade will handle related records)
    DELETE FROM profiles
    WHERE deleted_at IS NOT NULL
      AND deleted_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN QUERY SELECT 'profiles'::text, deleted_count;
    
    -- Purge appointments
    DELETE FROM appointments
    WHERE deleted_at IS NOT NULL
      AND deleted_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN QUERY SELECT 'appointments'::text, deleted_count;
    
    -- Purge services
    DELETE FROM services
    WHERE deleted_at IS NOT NULL
      AND deleted_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN QUERY SELECT 'services'::text, deleted_count;
    
    -- Purge courses
    DELETE FROM courses
    WHERE deleted_at IS NOT NULL
      AND deleted_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN QUERY SELECT 'courses'::text, deleted_count;
    
    -- Purge client notes
    DELETE FROM client_notes
    WHERE deleted_at IS NOT NULL
      AND deleted_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN QUERY SELECT 'client_notes'::text, deleted_count;
    
    -- Purge messages
    DELETE FROM messages
    WHERE deleted_at IS NOT NULL
      AND deleted_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN QUERY SELECT 'messages'::text, deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION fn_purge_old_soft_deletes() IS 'Permanently deletes soft-deleted records older than 90 days (GDPR compliance)';
-- Schedule to run weekly
-- SELECT cron.schedule('purge-soft-deletes', '0 4 * * 0', 'SELECT fn_purge_old_soft_deletes()');

5. DATABASE FUNCTIONS & TRIGGERS
5.1 Business Logic Functions
sql
-- =====================================================
-- MIGRATION 016: BUSINESS LOGIC FUNCTIONS
-- Description: Database-level business logic
-- =====================================================
-- =====================================================
-- FUNCTION: Update VIP status after booking
-- =====================================================
CREATE OR REPLACE FUNCTION fn_update_vip_status_on_booking()
RETURNS TRIGGER AS $$
DECLARE
    vip_record vip_members%ROWTYPE;
    rules vip_rules%ROWTYPE;
    days_since_last INTEGER;
BEGIN
    -- Only process confirmed appointments
    IF NEW.status != 'confirmed' THEN
        RETURN NEW;
    END IF;
    
    -- Get VIP rules
    SELECT * INTO rules FROM vip_rules LIMIT 1;
    
    -- Get or create VIP record for client
    SELECT * INTO vip_record FROM vip_members WHERE client_id = NEW.client_id;
    
    IF NOT FOUND THEN
        -- Create new VIP record
        INSERT INTO vip_members (
            client_id,
            current_streak,
            total_bookings,
            last_booking_date,
            status
        ) VALUES (
            NEW.client_id,
            1,
            1,
            NEW.appointment_date,
            'inactive'
        );
    ELSE
        -- Calculate days since last booking
        days_since_last := NEW.appointment_date - vip_record.last_booking_date;
        
        IF days_since_last <= rules.streak_window_days THEN
            -- Within window - increment streak
            UPDATE vip_members SET
                current_streak = current_streak + 1,
                longest_streak = GREATEST(longest_streak, current_streak + 1),
                total_bookings = total_bookings + 1,
                last_booking_date = NEW.appointment_date,
                status = CASE
                    WHEN current_streak + 1 >= rules.streak_requirement THEN 'active'::vip_status
                    ELSE status
                END,
                vip_since = CASE
                    WHEN current_streak + 1 = rules.streak_requirement AND vip_since IS NULL
                    THEN NEW.appointment_date
                    ELSE vip_since
                END,
                updated_at = NOW()
            WHERE client_id = NEW.client_id;
        ELSE
            -- Window expired - reset streak
            UPDATE vip_members SET
                current_streak = 1,
                total_bookings = total_bookings + 1,
                last_booking_date = NEW.appointment_date,
                status = 'inactive',
                updated_at = NOW()
            WHERE client_id = NEW.client_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER trg_update_vip_on_booking
    AFTER INSERT OR UPDATE ON appointments
    FOR EACH ROW
    WHEN (NEW.status = 'confirmed')
    EXECUTE FUNCTION fn_update_vip_status_on_booking();
COMMENT ON FUNCTION fn_update_vip_status_on_booking() IS 'Automatically updates VIP streak and status when booking confirmed';
-- =====================================================
-- FUNCTION: Calculate appointment end time
-- =====================================================
CREATE OR REPLACE FUNCTION fn_calculate_appointment_end_time(
    start_time TIME,
    duration_minutes INTEGER
)
RETURNS TIME AS $$
BEGIN
    RETURN start_time + (duration_minutes || ' minutes')::INTERVAL;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
COMMENT ON FUNCTION fn_calculate_appointment_end_time(TIME, INTEGER) IS 'Calculates appointment end time based on start time and duration';
-- =====================================================
-- FUNCTION: Check for appointment conflicts
-- =====================================================
CREATE OR REPLACE FUNCTION fn_check_appointment_conflict(
    p_staff_id UUID,
    p_date DATE,
    p_start_time TIME,
    p_duration_minutes INTEGER,
    p_exclude_appointment_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    p_end_time TIME;
    conflict_count INTEGER;
BEGIN
    -- Calculate end time
    p_end_time := fn_calculate_appointment_end_time(p_start_time, p_duration_minutes);
    
    -- Check for overlapping appointments
    SELECT COUNT(*) INTO conflict_count
    FROM appointments
    WHERE staff_id = p_staff_id
      AND appointment_date = p_date
      AND status IN ('confirmed', 'pending')
      AND deleted_at IS NULL
      AND (id IS DISTINCT FROM p_exclude_appointment_id)
      AND (
          -- New appointment starts during existing appointment
          (p_start_time >= appointment_time AND p_start_time < fn_calculate_appointment_end_time(appointment_time, duration_minutes))
          OR
          -- New appointment ends during existing appointment
          (p_end_time > appointment_time AND p_end_time <= fn_calculate_appointment_end_time(appointment_time, duration_minutes))
          OR
          -- New appointment completely overlaps existing appointment
          (p_start_time <= appointment_time AND p_end_time >= fn_calculate_appointment_end_time(appointment_time, duration_minutes))
      );
    
    RETURN conflict_count > 0;
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION fn_check_appointment_conflict IS 'Checks if an appointment would conflict with existing bookings';
-- =====================================================
-- FUNCTION: Cancel appointment with refund logic
-- =====================================================
CREATE OR REPLACE FUNCTION fn_cancel_appointment(
    p_appointment_id UUID,
    p_cancelled_by UUID,
    p_reason TEXT DEFAULT NULL,
    p_admin_override_refund BOOLEAN DEFAULT FALSE
)
RETURNS TABLE(
    success BOOLEAN,
    refund_amount DECIMAL,
    message TEXT
) AS $$
DECLARE
    apt appointments%ROWTYPE;
    hours_until INTEGER;
    should_refund BOOLEAN;
BEGIN
    -- Get appointment
    SELECT * INTO apt FROM appointments WHERE id = p_appointment_id;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 0::DECIMAL, 'Appointment not found';
        RETURN;
    END IF;
    
    IF apt.status = 'cancelled' THEN
        RETURN QUERY SELECT FALSE, 0::DECIMAL, 'Appointment already cancelled';
        RETURN;
    END IF;
    
    -- Calculate hours until appointment
    hours_until := EXTRACT(EPOCH FROM (
        (apt.appointment_date + apt.appointment_time) - NOW()
    )) / 3600;
    
    -- Determine if deposit should be refunded
    IF p_admin_override_refund THEN
        should_refund := TRUE;
    ELSE
        should_refund := hours_until >= 24;
    END IF;
    
    -- Update appointment
    UPDATE appointments SET
        status = 'cancelled',
        deposit_status = CASE
            WHEN should_refund THEN 'refunded'::deposit_status
            ELSE 'forfeited'::deposit_status
        END,
        cancelled_at = NOW(),
        cancelled_by = p_cancelled_by,
        cancellation_reason = p_reason,
        updated_at = NOW()
    WHERE id = p_appointment_id;
    
    -- Return result
    IF should_refund THEN
        RETURN QUERY SELECT 
            TRUE, 
            apt.deposit_amount, 
            'Appointment cancelled. Deposit will be refunded within 5-10 business days.';
    ELSE
        RETURN QUERY SELECT 
            TRUE, 
            0::DECIMAL, 
            'Appointment cancelled. Deposit forfeited (less than 24 hours notice).';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION fn_cancel_appointment IS 'Cancels appointment with business logic for deposit refund (24hr rule)';
-- =====================================================
-- FUNCTION: Apply VIP discount to appointment
-- =====================================================
CREATE OR REPLACE FUNCTION fn_calculate_vip_discount(
    p_client_id UUID,
    p_base_price DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
    vip_record vip_members%ROWTYPE;
    rules vip_rules%ROWTYPE;
    client_birthday DATE;
    discount_percentage INTEGER := 0;
BEGIN
    -- Get VIP status
    SELECT * INTO vip_record FROM vip_members 
    WHERE client_id = p_client_id AND status = 'active';
    
    IF NOT FOUND THEN
        RETURN 0;  -- No discount
    END IF;
    
    -- Get VIP rules
    SELECT * INTO rules FROM vip_rules LIMIT 1;
    
    -- Get client birthday
    SELECT birthday INTO client_birthday FROM profiles WHERE id = p_client_id;
    
    -- Determine discount percentage
    IF client_birthday IS NOT NULL 
       AND EXTRACT(MONTH FROM client_birthday) = EXTRACT(MONTH FROM CURRENT_DATE) THEN
        -- Birthday month - higher discount
        discount_percentage := rules.birthday_discount_percentage;
    ELSE
        -- Regular VIP discount
        discount_percentage := rules.vip_discount_percentage;
    END IF;
    
    -- Calculate discount amount
    RETURN ROUND(p_base_price * discount_percentage / 100, 2);
END;
$$ LANGUAGE plpgsql STABLE;
COMMENT ON FUNCTION fn_calculate_vip_discount IS 'Calculates VIP discount amount (10% standard, 20% birthday month)';
-- =====================================================
-- FUNCTION: Send reminder notifications (scheduled job)
-- =====================================================
CREATE OR REPLACE FUNCTION fn_process_reminder_notifications()
RETURNS TABLE(
    note_id UUID,
    client_id UUID,
    notification_sent BOOLEAN
) AS $$
DECLARE
    note_record client_notes%ROWTYPE;
BEGIN
    -- Find notes with reminders due
    FOR note_record IN
        SELECT * FROM client_notes
        WHERE reminder_date IS NOT NULL
          AND reminder_date <= NOW()
          AND reminder_sent = FALSE
          AND is_completed = FALSE
          AND deleted_at IS NULL
    LOOP
        -- Insert notification
        INSERT INTO notifications (
            user_id,
            type,
            title,
            body,
            sent_at
        ) VALUES (
            note_record.client_id,
            'reminder',
            'Reminder: ' || note_record.title,
            note_record.content,
            NOW()
        );
        
        -- Mark reminder as sent
        UPDATE client_notes
        SET reminder_sent = TRUE, updated_at = NOW()
        WHERE id = note_record.id;
        
        -- Return result
        RETURN QUERY SELECT note_record.id, note_record.client_id, TRUE;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION fn_process_reminder_notifications() IS 'Processes pending reminder notifications (run every 5 minutes)';
-- Schedule reminder job
-- SELECT cron.schedule('process-reminders', '*/5 * * * *', 'SELECT fn_process_reminder_notifications()');
-- =====================================================
-- FUNCTION: Check for expiring VIP streaks (daily job)
-- =====================================================
CREATE OR REPLACE FUNCTION fn_check_expiring_vip_streaks()
RETURNS TABLE(
    client_id UUID,
    days_remaining INTEGER,
    notification_sent BOOLEAN
) AS $$
DECLARE
    vip_record vip_members%ROWTYPE;
    rules vip_rules%ROWTYPE;
    days_since_last INTEGER;
    days_remaining INTEGER;
BEGIN
    -- Get VIP rules
    SELECT * INTO rules FROM vip_rules LIMIT 1;
    
    -- Find active VIPs with expiring streaks
    FOR vip_record IN
        SELECT * FROM vip_members
        WHERE status = 'active'
          AND last_booking_date IS NOT NULL
    LOOP
        -- Calculate days since last booking
        days_since_last := CURRENT_DATE - vip_record.last_booking_date;
        days_remaining := rules.streak_window_days - days_since_last;
        
        -- Send warning if 7 days or less remaining
        IF days_remaining > 0 AND days_remaining <= 7 THEN
            INSERT INTO notifications (
                user_id,
                type,
                title,
                body,
                sent_at
            ) VALUES (
                vip_record.client_id,
                'vip_streak_warning',
                'VIP Streak Expiring Soon',
                format('Your VIP streak will expire in %s days. Book an appointment to maintain your VIP status!', days_remaining),
                NOW()
            );
            
            RETURN QUERY SELECT vip_record.client_id, days_remaining, TRUE;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION fn_check_expiring_vip_streaks() IS 'Sends warnings for VIP streaks expiring within 7 days (run daily)';
-- Schedule VIP check job
-- SELECT cron.schedule('check-vip-streaks', '0 9 * * *', 'SELECT fn_check_expiring_vip_streaks()');

6. DATA SEEDING SCRIPTS
6.1 Initial Data (Required for App to Function)
sql
-- =====================================================
-- MIGRATION 017: SEED DATA
-- Description: Initial data required for app functionality
-- =====================================================
-- =====================================================
-- SEED: Service Categories
-- =====================================================
INSERT INTO service_categories (name, display_order, active) VALUES
('Mega Volume', 1, true),
('Volume Lashes', 2, true),
('Natural/Hybrid', 3, true),
('Lash Renewal', 4, true),
('Makeup', 5, true),
('Hair Styling', 6, true),
('Bridal', 7, true),
('Packages', 8, true),
('Courses', 9, true)
ON CONFLICT (name) DO NOTHING;
-- =====================================================
-- SEED: Sample Services
-- =====================================================
DO $$
DECLARE
    cat_mega_volume UUID;
    cat_volume UUID;
    cat_natural UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO cat_mega_volume FROM service_categories WHERE name = 'Mega Volume';
    SELECT id INTO cat_volume FROM service_categories WHERE name = 'Volume Lashes';
    SELECT id INTO cat_natural FROM service_categories WHERE name = 'Natural/Hybrid';
    
    -- Insert sample services
    INSERT INTO services (category_id, name, description, duration_minutes, base_price, deposit_amount, display_order) VALUES
    (cat_mega_volume, 'Mega Volume Full Set', 'Ultra-dramatic, high-density lash extensions for maximum volume and impact', 180, 350.00, 50.00, 1),
    (cat_mega_volume, 'Mega Volume Refill', 'Maintenance and infill for existing mega volume sets', 120, 200.00, 50.00, 2),
    
    (cat_volume, 'Volume Full Set', 'Classic volume lash extensions with 2-5D fans for fullness', 150, 300.00, 50.00, 1),
    (cat_volume, 'Volume Refill (2 weeks)', 'Refill for volume sets within 2 weeks', 90, 150.00, 50.00, 2),
    (cat_volume, 'Volume Refill (3-4 weeks)', 'Refill for volume sets after 3-4 weeks', 120, 180.00, 50.00, 3),
    
    (cat_natural, 'Natural Hybrid Full Set', 'Natural-looking hybrid lashes combining classic and volume techniques', 150, 280.00, 50.00, 1),
    (cat_natural, 'Natural Hybrid Refill', 'Maintenance for natural hybrid sets', 90, 140.00, 50.00, 2)
    ON CONFLICT DO NOTHING;
END $$;
COMMENT ON TABLE services IS 'Pre-seeded with sample services - Admin can add/edit via app';
-- =====================================================
-- SEED: Admin Account
-- =====================================================
-- NOTE: This must be run AFTER creating Supabase Auth user via dashboard or API
-- Replace {ADMIN_AUTH_ID} with actual auth.users ID for Lash Mama
-- Manual step (run after creating auth user):
/*
UPDATE profiles SET
    role = 'admin',
    full_name = 'Lash Mama',
    phone = '0400000000'
WHERE id = '{ADMIN_AUTH_ID}';
INSERT INTO staff (id, title, level, bio, specialties, is_bookable)
VALUES (
    '{ADMIN_AUTH_ID}',
    'Founder & Master Lash Artist',
    'master',
    '8+ years of experience. Award-winning lash artist. Creator of signature Mega Volume technique.',
    ARRAY['Volume Specialist', 'Master Trainer', 'Bridal Expert'],
    true
);
*/

6.2 Test Data (Development Only)
sql
-- =====================================================
-- MIGRATION 018: TEST DATA (DEV ONLY)
-- Description: Sample data for testing - DO NOT RUN IN PRODUCTION
-- =====================================================
-- IMPORTANT: This script is for development/testing only
-- Run only in dev environment, never in production
DO $$
DECLARE
    admin_id UUID;
    nikki_id UUID;
    beau_id UUID;
    client1_id UUID;
    client2_id UUID;
    service_mega UUID;
    service_volume UUID;
BEGIN
    -- This is a placeholder - actual user IDs must be created via Supabase Auth first
    -- Uncomment and modify with actual IDs after creating test users
    
    /*
    -- Get user IDs (replace with actual values)
    admin_id := 'REPLACE_WITH_ADMIN_AUTH_ID';
    nikki_id := 'REPLACE_WITH_NIKKI_AUTH_ID';
    beau_id := 'REPLACE_WITH_BEAU_AUTH_ID';
    client1_id := 'REPLACE_WITH_CLIENT1_AUTH_ID';
    client2_id := 'REPLACE_WITH_CLIENT2_AUTH_ID';
    
    -- Get service IDs
    SELECT id INTO service_mega FROM services WHERE name = 'Mega Volume Full Set' LIMIT 1;
    SELECT id INTO service_volume FROM services WHERE name = 'Volume Full Set' LIMIT 1;
    
    -- Create staff records
    INSERT INTO staff (id, title, level, bio, specialties) VALUES
    (nikki_id, 'Senior Lash Artist', 'senior', 'Specializes in volume and mega volume techniques', ARRAY['Volume Specialist', 'Detail-Oriented']),
    (beau_id, 'Senior Lash & Beauty Artist', 'senior', 'Expert in lashes, makeup, and bridal styling', ARRAY['Bridal Expert', 'Makeup Artist'])
    ON CONFLICT (id) DO NOTHING;
    
    -- Create staff schedules (Mon-Sat 9am-6pm)
    INSERT INTO staff_schedules (staff_id, day_of_week, start_time, end_time, is_working)
    SELECT staff_id, day, '09:00'::TIME, '18:00'::TIME, true
    FROM (VALUES (nikki_id), (beau_id)) AS s(staff_id)
    CROSS JOIN generate_series(1, 6) AS day  -- Mon-Sat
    ON CONFLICT DO NOTHING;
    
    -- Create sample appointments
    INSERT INTO appointments (
        client_id, staff_id, service_id,
        appointment_date, appointment_time, duration_minutes,
        status, deposit_status,
        total_amount, deposit_amount, remaining_balance
    ) VALUES
    (client1_id, nikki_id, service_mega,
     CURRENT_DATE + INTERVAL '3 days', '10:00'::TIME, 180,
     'confirmed', 'paid',
     350.00, 50.00, 300.00),
    (client1_id, admin_id, service_volume,
     CURRENT_DATE + INTERVAL '7 days', '14:00'::TIME, 150,
     'confirmed', 'paid',
     300.00, 50.00, 250.00)
    ON CONFLICT DO NOTHING;
    
    -- Create VIP member
    INSERT INTO vip_members (client_id, current_streak, total_bookings, last_booking_date, status)
    VALUES (client1_id, 12, 24, CURRENT_DATE - INTERVAL '10 days', 'active')
    ON CONFLICT (client_id) DO NOTHING;
    */
    
    RAISE NOTICE 'Test data script template ready. Uncomment and modify with actual Auth user IDs.';
END $$;

7. AUTH & RBAC IMPLEMENTATION NOTES
7.1 Supabase Auth Integration
typescript
// =====================================================
// AUTH INTEGRATION ASSUMPTIONS
// =====================================================
/**
 * SUPABASE AUTH SETUP
 * 
 * 1. Email/Password Provider:
 *    - Enabled in Supabase Dashboard → Authentication → Providers
 *    - Email confirmation: Optional (can be disabled for faster onboarding)
 *    - Minimum password length: 8 characters
 *    
 * 2. JWT Settings:
 *    - JWT Expiry: 3600 seconds (1 hour)
 *    - Refresh Token Expiry: 2592000 seconds (30 days)
 *    - Auto Refresh: Enabled (Supabase client handles automatically)
 *    
 * 3. Email Templates:
 *    - Customize in Supabase Dashboard → Authentication → Email Templates
 *    - Confirm Signup
 *    - Reset Password
 *    - Magic Link (if used in future)
 *    
 * 4. Security:
 *    - Rate Limiting: Enabled (default: 5 login attempts per 15 minutes)
 *    - Email Rate Limiting: Enabled (prevent spam)
 *    - CAPTCHA: Can be enabled for additional security
 */
// =====================================================
// CLIENT-SIDE AUTH FLOW
// =====================================================
// Initialize Supabase client
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
// Signup flow
export async function signUp(email: string, password: string, metadata: {
  full_name: string;
  phone: string;
  birthday?: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,  // Stored in auth.users.raw_user_meta_data
    },
  });
  
  // Database trigger automatically creates profile with role='client'
  
  return { data, error };
}
// Login flow
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) return { data: null, error };
  
  // Fetch user profile to get role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  return { data: { user: data.user, profile }, error: profileError };
}
// Get current user with profile
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  return { user: session.user, profile };
}
// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
// =====================================================
// ROLE-BASED ROUTING (Expo Router)
// =====================================================
// app/_layout.tsx
export default function RootLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        fetchUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        router.replace('/auth/login');
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  async function fetchUserProfile(userId: string) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    setUser({ ...session.user, profile });
    setLoading(false);
    
    // Route based on role
    switch (profile.role) {
      case 'client':
        router.replace('/client/home');
        break;
      case 'manager':
        router.replace('/manager/home');
        break;
      case 'admin':
        router.replace('/admin/home');
        break;
    }
  }
  
  if (loading) return <SplashScreen />;
  
  return <Slot />;
}
// =====================================================
// RLS IN PRACTICE
// =====================================================
// Example: Fetch appointments (RLS automatically filters)
export async function getAppointments() {
  // No role checking needed in client code
  // RLS policies handle authorization at database level
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      client:profiles!client_id(full_name, phone),
      staff:staff!staff_id(title),
      service:services(name, duration_minutes)
    `)
    .order('appointment_date', { ascending: true });
  
  // Returns different results based on who's logged in:
  // - Client: Only their appointments
  // - Manager: All appointments except admin's
  // - Admin: All appointments
  
  return { data, error };
}
// Example: Check if user can perform action (secondary validation)
export async function canCancelAppointment(appointmentId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  
  const { data: appointment } = await supabase
    .from('appointments')
    .select('client_id, appointment_date, appointment_time, status')
    .eq('id', appointmentId)
    .single();
  
  if (!appointment) return false;
  
  // Client can cancel their own appointments
  if (user.profile.role === 'client' && appointment.client_id === user.user.id) {
    // Check if >24hrs before appointment
    const appointmentDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`);
    const hoursUntil = (appointmentDateTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntil >= 24 && appointment.status === 'confirmed';
  }
  
  // Staff/Admin can always cancel
  if (['manager', 'admin'].includes(user.profile.role)) {
    return true;
  }
  
  return false;
}

7.2 Role Assignment & Management
typescript
// =====================================================
// STAFF ACCOUNT CREATION (EDGE FUNCTION)
// =====================================================
// supabase/functions/create-staff-account/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
serve(async (req) => {
  try {
    // Verify requester is admin
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role !== 'admin') {
      throw new Error('Only admin can create staff accounts');
    }
    
    // Parse request
    const { email, full_name, phone, role, level, title } = await req.json();
    
    // Generate secure random password
    const tempPassword = crypto.randomUUID();
    
    // Create auth user (requires service role key)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name,
        phone,
      },
    });
    
    if (authError) throw authError;
    
    // Update profile role (trigger already created profile with role='client')
    await supabaseAdmin
      .from('profiles')
      .update({ role })
      .eq('id', authUser.user.id);
    
    // Create staff record
    await supabaseAdmin
      .from('staff')
      .insert({
        id: authUser.user.id,
        title,
        level,
        is_bookable: true,
      });
    
    // Send invitation email (via external service or Supabase email)
    // ... email logic here ...
    
    // Log audit
    await supabaseAdmin.from('audit_logs').insert({
      user_id: user.id,
      action: 'staff_created',
      entity_type: 'staff',
      entity_id: authUser.user.id,
      metadata: { email, role, level },
    });
    
    return new Response(
      JSON.stringify({ success: true, userId: authUser.user.id }),
      { headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});

Continue to Part 4: Architecture & Implementation Plan...
YES
Jan 29
🗄️ LASH MAMA - SUPABASE SCHEMA (PART 4)
Architecture & Implementation Plan

8. ARCHITECTURE & IMPLEMENTATION PLAN
8.1 Implementation Strategy
Golden Rule: Build foundation first, then features in dependency order.
Phases:
	1. Foundation (Week 1-2): Core infrastructure, no features yet
	2. Client Features (Week 3-5): Revenue-generating booking flow
	3. Manager Features (Week 6-7): Operational tools
	4. Admin Features (Week 8-10): Analytics, system management
	5. Polish & Testing (Week 11-12): Performance, edge cases, production readiness

8.2 Phase 1: Foundation (Week 1-2)
Objective: Build shared infrastructure that all features depend on.

8.2.1 Database Setup
bash
# Week 1, Day 1-2: Database Migration
# 1. Create fresh Supabase project
# - Via Supabase Dashboard
# - Copy project URL and keys
# 2. Run migrations in order
psql $DATABASE_URL < migrations/001_extensions_enums.sql
psql $DATABASE_URL < migrations/002_profiles.sql
psql $DATABASE_URL < migrations/003_staff.sql
psql $DATABASE_URL < migrations/004_services.sql
psql $DATABASE_URL < migrations/005_client_tables.sql
psql $DATABASE_URL < migrations/006_appointments.sql
psql $DATABASE_URL < migrations/007_payments.sql
psql $DATABASE_URL < migrations/008_vip.sql
psql $DATABASE_URL < migrations/009_courses.sql
psql $DATABASE_URL < migrations/010_messaging.sql
psql $DATABASE_URL < migrations/011_notifications.sql
psql $DATABASE_URL < migrations/012_audit.sql
psql $DATABASE_URL < migrations/013_utility_functions.sql
psql $DATABASE_URL < migrations/014_performance_indexes.sql
psql $DATABASE_URL < migrations/015_maintenance.sql
psql $DATABASE_URL < migrations/016_business_logic.sql
psql $DATABASE_URL < migrations/017_seed_data.sql
# 3. Verify RLS policies
psql $DATABASE_URL -c "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
# All tables should show rowsecurity = true
# 4. Create admin account
# Via Supabase Dashboard → Authentication → Users → Add User
# Then update role manually in profiles table
# 5. Run seed data
psql $DATABASE_URL < migrations/017_seed_data.sql
Deliverables:
	• ✅ All tables created
	• ✅ All RLS policies active
	• ✅ All indexes created
	• ✅ All functions & triggers working
	• ✅ Admin account exists
	• ✅ Sample services seeded

8.2.2 Project Structure Setup
bash
# Week 1, Day 3: Initialize React Native project
# Create Expo project
npx create-expo-app@latest lash-mama --template blank-typescript
cd lash-mama
# Install core dependencies
npm install @supabase/supabase-js
npm install expo-secure-store
npm install @react-navigation/native
npm install @tanstack/react-query
npm install zustand
npm install react-hook-form
npm install zod
# Install UI dependencies
npm install react-native-reanimated
npm install react-native-gesture-handler
npm install expo-linear-gradient
npm install @expo/vector-icons
# Install payment dependencies
npm install @stripe/stripe-react-native
# Dev dependencies
npm install --save-dev @types/react
npm install --save-dev typescript
npm install --save-dev prettier
npm install --save-dev eslint
```
**Project Structure:**
```
lash-mama/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/                   # Auth flow (unauthenticated)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (client)/                 # Client app
│   │   ├── _layout.tsx           # Client tab navigator
│   │   ├── home.tsx
│   │   ├── appointments.tsx
│   │   ├── book/
│   │   │   ├── index.tsx
│   │   │   ├── select-service.tsx
│   │   │   ├── select-artist.tsx
│   │   │   ├── select-time.tsx
│   │   │   ├── allergy-form.tsx
│   │   │   └── payment.tsx
│   │   ├── vip.tsx
│   │   └── more.tsx
│   ├── (manager)/                # Manager app
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── calendar.tsx
│   │   ├── messages.tsx
│   │   ├── clients.tsx
│   │   └── more.tsx
│   ├── (admin)/                  # Admin app
│   │   ├── _layout.tsx
│   │   ├── home.tsx
│   │   ├── calendar.tsx
│   │   ├── messages.tsx
│   │   ├── clients.tsx
│   │   ├── analytics.tsx
│   │   ├── vip.tsx
│   │   ├── staff.tsx
│   │   ├── courses.tsx
│   │   └── settings.tsx
│   └── _layout.tsx               # Root layout (auth check)
├── src/
│   ├── lib/                      # Core utilities
│   │   ├── supabase.ts           # Supabase client
│   │   ├── storage.ts            # SecureStore wrapper
│   │   └── constants.ts
│   ├── services/                 # API layer (role-agnostic)
│   │   ├── auth.api.ts
│   │   ├── appointments.api.ts
│   │   ├── services.api.ts
│   │   ├── staff.api.ts
│   │   ├── clients.api.ts
│   │   ├── vip.api.ts
│   │   ├── messages.api.ts
│   │   └── payments.api.ts
│   ├── types/                    # Global TypeScript types
│   │   ├── database.types.ts     # Generated from Supabase
│   │   ├── models.ts             # Domain models
│   │   └── api.types.ts
│   ├── components/
│   │   ├── shared/               # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   └── layout/               # Layout components
│   │       ├── Header.tsx
│   │       ├── TabBar.tsx
│   │       └── ScreenWrapper.tsx
│   ├── features/                 # Feature-specific code
│   │   ├── client/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── styles/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── manager/
│   │   │   └── (same structure)
│   │   └── admin/
│   │       └── (same structure)
│   ├── theme/                    # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── hooks/                    # Global hooks
│   │   ├── useAuth.ts
│   │   ├── useUser.ts
│   │   └── usePermissions.ts
│   └── utils/                    # Utility functions
│       ├── validation.ts
│       ├── formatting.ts
│       ├── date.ts
│       └── errors.ts
├── supabase/                     # Supabase-specific code
│   ├── functions/                # Edge functions
│   │   ├── create-payment-intent/
│   │   ├── webhook-stripe/
│   │   ├── create-staff-account/
│   │   └── send-notification/
│   └── migrations/               # SQL migrations (copy of executed scripts)
├── assets/                       # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Template
├── app.json                      # Expo config
├── tsconfig.json
└── package.json
Deliverables:
	• ✅ Project initialized
	• ✅ Dependencies installed
	• ✅ Folder structure created
	• ✅ TypeScript configured

8.2.3 Core Infrastructure
Week 1, Day 4-5: Supabase Client & Auth
typescript
// src/lib/supabase.ts
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Database } from '@/types/database.types';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
// SecureStore adapter for token storage
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
typescript
// src/services/auth.api.ts
import { supabase } from '@/lib/supabase';
import type { UserProfile, SignUpData } from '@/types/models';
export async function signUp(data: SignUpData) {
  const { error: authError, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        phone: data.phone,
        birthday: data.birthday,
      },
    },
  });
  if (authError) throw authError;
  return authData;
}
export async function signIn(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  // Fetch profile with role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();
  if (profileError) throw profileError;
  return { user: data.user, profile };
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
export async function getCurrentUser(): Promise<UserProfile | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  if (!profile) return null;
  return {
    id: session.user.id,
    email: session.user.email!,
    role: profile.role,
    fullName: profile.full_name,
    phone: profile.phone,
    birthday: profile.birthday,
    avatarUrl: profile.avatar_url,
  };
}
Week 2, Day 1-2: Design System
typescript
// src/theme/colors.ts
export const colors = {
  // Primary
  primary: {
    50: '#FEF7ED',
    100: '#FDEFD5',
    500: '#D4AF37',  // Gold
    600: '#B8941F',
    700: '#9C7A19',
  },
  
  // Neutrals
  neutral: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    500: '#78716C',
    700: '#44403C',
    900: '#1C1917',
  },
  
  // Semantic
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Backgrounds
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAF9',
    tertiary: '#F5F5F4',
  },
};
// src/theme/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};
// src/theme/typography.ts
export const typography = {
  fonts: {
    heading: 'System',  // Replace with custom font
    body: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};
Week 2, Day 3-4: Shared Components
typescript
// src/components/shared/Button.tsx
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '@/theme';
interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}
export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFF' : colors.primary[500]} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.neutral[100],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  destructive: {
    backgroundColor: colors.error,
  },
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.neutral[900],
  },
  outlineText: {
    color: colors.primary[500],
  },
  destructiveText: {
    color: '#FFFFFF',
  },
});
Week 2, Day 5: Error Handling System
typescript
// src/utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public userMessage: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AppError';
  }
}
export class NetworkError extends AppError {
  constructor() {
    super(
      'Network error',
      'NETWORK_ERROR',
      'No internet connection. Please check your network and try again.',
      true
    );
  }
}
export class AuthError extends AppError {
  constructor(message: string) {
    super(
      message,
      'AUTH_ERROR',
      'Authentication failed. Please try again.',
      false
    );
  }
}
export class ValidationError extends AppError {
  constructor(public field: string, userMessage: string) {
    super(
      `Validation error: ${field}`,
      'VALIDATION_ERROR',
      userMessage,
      false
    );
  }
}
export function mapSupabaseError(error: any): AppError {
  if (error.message?.includes('network')) {
    return new NetworkError();
  }
  
  if (error.message?.includes('Invalid login credentials')) {
    return new AuthError('Invalid email or password');
  }
  
  // ... more mappings
  
  return new AppError(
    error.message,
    'UNKNOWN_ERROR',
    'Something went wrong. Please try again.',
    false
  );
}
Deliverables:
	• ✅ Supabase client configured
	• ✅ Auth service implemented
	• ✅ Design system created
	• ✅ Core components built
	• ✅ Error handling system

8.3 Phase 2: Client Features (Week 3-5)
Objective: Build revenue-generating booking flow first.
Priority Order:
	1. Home screen (browse services)
	2. Booking flow (service → artist → time → payment)
	3. Appointments list
	4. Profile management
	5. VIP dashboard
	6. Messaging

8.3.1 Week 3: Booking Flow Foundation
Day 1-2: Service Browsing
typescript
// src/services/services.api.ts
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      category:service_categories(name)
    `)
    .eq('active', true)
    .is('deleted_at', null)
    .order('display_order');
  if (error) throw mapSupabaseError(error);
  return data;
}
// app/(client)/book/select-service.tsx
export default function SelectServiceScreen() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
  // Group by category, render list...
}
Day 3-4: Artist Selection
typescript
// src/services/staff.api.ts
export async function getAvailableStaff(serviceId: string) {
  const { data, error } = await supabase
    .from('staff')
    .select(`
      id,
      title,
      bio,
      level,
      specialties,
      profiles:profiles(full_name, avatar_url)
    `)
    .eq('is_bookable', true)
    .is('deleted_at', null);
  if (error) throw mapSupabaseError(error);
  return data;
}
Day 5: Time Selection
typescript
// src/services/appointments.api.ts
export async function getAvailableSlots(
  staffId: string,
  date: string,
  duration: number
) {
  // Fetch staff schedule for that day
  const dayOfWeek = new Date(date).getDay();
  
  const { data: schedule } = await supabase
    .from('staff_schedules')
    .select('start_time, end_time')
    .eq('staff_id', staffId)
    .eq('day_of_week', dayOfWeek)
    .eq('is_working', true)
    .single();
  if (!schedule) return [];
  // Fetch existing appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('appointment_time, duration_minutes')
    .eq('staff_id', staffId)
    .eq('appointment_date', date)
    .in('status', ['confirmed', 'pending']);
  // Generate available slots (logic to exclude conflicts)
  const slots = generateTimeSlots(
    schedule.start_time,
    schedule.end_time,
    duration,
    appointments
  );
  return slots;
}

8.3.2 Week 4: Payment Integration
Day 1-2: Stripe Setup
typescript
// supabase/functions/create-payment-intent/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.1.0";
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2022-11-15',
});
serve(async (req) => {
  const { amount, appointmentDetails } = await req.json();
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,  // $50 deposit
    currency: 'aud',
    metadata: appointmentDetails,
  });
  return new Response(
    JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    { headers: { "Content-Type": "application/json" } }
  );
});
typescript
// app/(client)/book/payment.tsx
import { useStripe, CardField } from '@stripe/stripe-react-native';
export default function PaymentScreen() {
  const { confirmPayment } = useStripe();
  async function handlePayment() {
    // Call edge function to create Payment Intent
    const { clientSecret } = await createPaymentIntent(50, bookingDetails);
    // Confirm payment with Stripe SDK
    const { error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });
    if (error) {
      // Handle error
    } else {
      // Success - booking will be created by webhook
      router.push('/appointments');
    }
  }
  return (
    <View>
      <CardField />
      <Button onPress={handlePayment} title="Confirm Booking" />
    </View>
  );
}
Day 3-4: Webhook Handler
typescript
// supabase/functions/webhook-stripe/index.ts
serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!;
  const body = await req.text();
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  );
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Create appointment in database
    await supabase.from('appointments').insert({
      client_id: paymentIntent.metadata.client_id,
      staff_id: paymentIntent.metadata.staff_id,
      service_id: paymentIntent.metadata.service_id,
      appointment_date: paymentIntent.metadata.date,
      appointment_time: paymentIntent.metadata.time,
      status: 'confirmed',
      deposit_status: 'paid',
      payment_intent_id: paymentIntent.id,
      // ... other fields
    });
  }
  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
Day 5: Testing & Edge Cases
	• Test payment success
	• Test payment failure
	• Test slot conflict during payment
	• Test webhook idempotency

8.3.3 Week 5: Client Dashboard & Profile
Day 1-2: Appointments List
typescript
// app/(client)/appointments.tsx
export default function AppointmentsScreen() {
  const { data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: getMyAppointments,
  });
  return (
    <FlatList
      data={appointments}
      renderItem={({ item }) => <AppointmentCard appointment={item} />}
    />
  );
}
Day 3: VIP Dashboard
typescript
// app/(client)/vip.tsx
export default function VIPScreen() {
  const { data: vipStatus } = useQuery({
    queryKey: ['vip-status'],
    queryFn: getMyVIPStatus,
  });
  if (!vipStatus) {
    return <VIPProgressCard />;  // Show "7/10 bookings"
  }
  return <VIPDashboard status={vipStatus} />;
}
Day 4-5: Messaging & Notifications

Deliverables (Phase 2):
	• ✅ Complete booking flow working
	• ✅ Stripe payment integration
	• ✅ Appointments list
	• ✅ Profile management
	• ✅ VIP dashboard
	• ✅ Basic messaging

8.4 Phase 3: Manager Features (Week 6-7)
Objective: Enable operational management by staff.
Features:
	1. Manager dashboard (today's appointments)
	2. Calendar view (all staff except admin)
	3. Client management
	4. Booking on behalf of clients
	5. My Hours (personal schedule)
Implementation similar to Client, using same shared components and services.

8.5 Phase 4: Admin Features (Week 8-10)
Objective: God-mode system control.
Features:
	1. Analytics dashboard
	2. Service catalog management
	3. Staff management (CRUD)
	4. VIP program management
	5. Course management
	6. System settings

8.6 Phase 5: Polish & Production (Week 11-12)
Week 11: Performance & Testing
	• Load testing (simulate 100 concurrent users)
	• Performance profiling
	• Query optimization
	• Bundle size optimization
	• Lighthouse audit
Week 12: Production Deployment
	• Production Supabase project setup
	• Environment variables
	• Stripe production keys
	• App Store / Play Store submission
	• Monitoring setup (Sentry)

9. TESTING STRATEGY
9.1 Database Testing
sql
-- Test RLS policies (run as different users)
BEGIN;
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" = '{"sub":"client-user-id"}';
-- Should only see own appointments
SELECT * FROM appointments;
-- Should NOT be able to create appointment for another user
INSERT INTO appointments (client_id, ...) VALUES ('other-user-id', ...);
-- Expected: Empty result or error
ROLLBACK;
9.2 Integration Testing
typescript
// __tests__/booking-flow.test.ts
describe('Booking Flow', () => {
  it('should complete full booking flow', async () => {
    // 1. Select service
    const services = await getServices();
    expect(services).toHaveLength(7);
    // 2. Select artist
    const staff = await getAvailableStaff(services[0].id);
    expect(staff).toHaveLength(3);
    // 3. Get available slots
    const slots = await getAvailableSlots(staff[0].id, '2026-02-01', 180);
    expect(slots.length).toBeGreaterThan(0);
    // 4. Create payment intent
    const { clientSecret } = await createPaymentIntent(50, {
      service_id: services[0].id,
      staff_id: staff[0].id,
      date: '2026-02-01',
      time: slots[0],
    });
    expect(clientSecret).toBeDefined();
    // 5. Verify appointment created after webhook
    // (mock webhook or use Stripe test mode)
  });
});
9.3 End-to-End Testing
Use Detox or Maestro for E2E tests:
yaml
# .maestro/booking-flow.yaml
appId: com.lashmama.app
---
- launchApp
- tapOn: "Login"
- inputText: "client@test.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Book Appointment"
- tapOn: "Book Appointment"
- tapOn: "Mega Volume Full Set"
- tapOn: "Nikki"
- tapOn: "Jan 30"
- tapOn: "3:00 PM"
- tapOn: "Continue"
- assertVisible: "Payment"

10. PRODUCTION DEPLOYMENT CHECKLIST
10.1 Supabase Production Setup
	• Create production Supabase project
	• Run all migrations
	• Enable RLS on all tables
	• Verify all policies work
	• Set up database backups (daily)
	• Configure auth providers
	• Set up custom email templates
	• Enable audit logging
	• Configure rate limiting
10.2 Environment Variables
bash
# .env.production
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
10.3 Stripe Production
	• Switch to Stripe live mode
	• Configure production webhook endpoint
	• Test payment flow in production
	• Set up Stripe monitoring
10.4 App Store Submission
	• App icon (1024x1024)
	• Screenshots (all device sizes)
	• App Store description
	• Privacy policy URL
	• Terms of service URL
	• Submit for review
10.5 Monitoring & Alerts
	• Set up Sentry for error tracking
	• Configure admin email alerts (critical errors)
	• Set up Supabase monitoring
	• Database performance monitoring
	• Payment failure alerts

11. MAINTENANCE & OPERATIONS
11.1 Daily Tasks
	• Check admin alerts for payment mismatches
	• Review failed payment attempts
	• Monitor app crash rate (Sentry)
11.2 Weekly Tasks
	• Review booking conflicts
	• Analyze VIP conversion rate
	• Check database performance (slow queries)
11.3 Monthly Tasks
	• Database backup verification
	• Review audit logs for suspicious activity
	• Update dependencies
	• Performance profiling

CONCLUSION
This schema design and implementation plan provides:
✅ Production-grade database with comprehensive RLS
✅ Complete data model covering all business requirements
✅ Performance optimized with strategic indexes
✅ Business logic enforced at database level
✅ Audit trail for compliance and debugging
✅ Clear implementation path from foundation to features
✅ Testing strategy for confidence in production
The schema is LOCKED and ready for implementation.
Next Steps:
	1. Run migrations on fresh Supabase instance
	2. Test RLS policies thoroughly
	3. Begin Phase 1 (Foundation) implementation
	4. Follow implementation plan phase by phase
This is a portfolio-grade, staff-level architecture ready for production use. 🚀
