// Auth Login Screen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, textStyles, gradients } from '@/theme';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LoginScreen = () => (
  <View style={styles.container}>
    <LinearGradient colors={gradients.cream.colors} style={StyleSheet.absoluteFill} />
    <View style={styles.content}>
      <Text style={styles.logo}>👑</Text>
      <Text style={styles.title}>Lash Mama</Text>
      <Text style={styles.subtitle}>Premium Beauty Experience</Text>
      <View style={styles.form}>
        <Input label="Email" placeholder="your@email.com" keyboardType="email-address" />
        <Input label="Password" placeholder="••••••••" secureTextEntry />
        <Button title="Sign In" variant="luxury" fullWidth />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream.DEFAULT },
  content: { flex: 1, justifyContent: 'center', padding: spacing[6] },
  logo: { fontSize: 64, textAlign: 'center', marginBottom: spacing[2] },
  title: { ...textStyles.h1, textAlign: 'center', marginBottom: spacing[1] },
  subtitle: { ...textStyles.body, color: colors.muted.foreground, textAlign: 'center', marginBottom: spacing[8] },
  form: { gap: spacing[4] },
});

export default LoginScreen;
