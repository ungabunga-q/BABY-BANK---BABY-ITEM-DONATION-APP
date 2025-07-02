import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg' }}
            style={styles.heroImage}
          />
          <Text style={styles.title}>BabyBank</Text>
          <Text style={styles.subtitle}>
            Connecting families to share baby essentials with love and care
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🎁 Give & Receive</Text>
            <Text style={styles.featureText}>
              Donate items your baby has outgrown or find what you need
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🌍 Local Community</Text>
            <Text style={styles.featureText}>
              Connect with families and charities in your neighborhood
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>💝 Safe & Trusted</Text>
            <Text style={styles.featureText}>
              Verified users and secure messaging for peace of mind
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Get Started"
            onPress={() => router.push('/(auth)/role-selection')}
            size="large"
            style={styles.primaryButton}
          />
          <Button
            title="Sign In"
            onPress={() => router.push('/(auth)/login')}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  features: {
    gap: 24,
  },
  feature: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
});