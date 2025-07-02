import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { Mail, Lock, User, MapPin } from 'lucide-react-native';

export default function RegisterScreen() {
  const { role = 'donor' } = useLocalSearchParams<{ role: string }>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join BabyBank as a {role} and start making a difference
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            error={errors.name}
            leftIcon={<User size={20} color={Colors.text.secondary} />}
          />

          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.text.secondary} />}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
            error={errors.password}
            secureTextEntry
            leftIcon={<Lock size={20} color={Colors.text.secondary} />}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
            error={errors.confirmPassword}
            secureTextEntry
            leftIcon={<Lock size={20} color={Colors.text.secondary} />}
          />

          <Input
            label="Location"
            placeholder="Enter your city or zip code"
            value={formData.location}
            onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
            error={errors.location}
            leftIcon={<MapPin size={20} color={Colors.text.secondary} />}
          />
        </View>

        <View style={styles.actions}>
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            size="large"
            style={styles.registerButton}
          />
          
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Button
              title="Sign In"
              onPress={() => router.push('/(auth)/login')}
              variant="ghost"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 32,
  },
  actions: {
    paddingBottom: 40,
  },
  registerButton: {
    width: '100%',
    marginBottom: 24,
  },
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
});