// App Entry Point
// Redirects to appropriate route based on auth state

import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Check auth state and redirect accordingly
  // For now, redirect to client home
  return <Redirect href="/(client)" />;
}
