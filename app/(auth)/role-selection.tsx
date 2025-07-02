import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';
import { Heart, Building2, Users, Gift } from 'lucide-react-native';

const roles = [
  {
    id: 'donor',
    title: 'Donor',
    description: 'Share items your child has outgrown',
    icon: Gift,
    color: Colors.primary,
  },
  {
    id: 'recipient',
    title: 'Recipient',
    description: 'Find items your family needs',
    icon: Heart,
    color: Colors.secondary,
  },
  {
    id: 'charity',
    title: 'Charity',
    description: 'Connect families with community support',
    icon: Building2,
    color: Colors.accent,
  },
];

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleContinue = () => {
    if (selectedRole) {
      router.push({
        pathname: '/(auth)/register',
        params: { role: selectedRole }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>How will you use BabyBank?</Text>
          <Text style={styles.subtitle}>
            Choose your primary role to get a personalized experience
          </Text>
        </View>

        <View style={styles.roles}>
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  selectedRole === role.id && [styles.selectedCard, { borderColor: role.color }]
                ]}
                onPress={() => setSelectedRole(role.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${role.color}15` }]}>
                  <IconComponent
                    size={32}
                    color={role.color}
                    strokeWidth={2}
                  />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedRole === role.id && [styles.selectedRadio, { backgroundColor: role.color }]
                ]} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.note}>
          <Users size={20} color={Colors.text.secondary} />
          <Text style={styles.noteText}>
            You can switch between donor and recipient modes anytime in your profile
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedRole}
            size="large"
            style={styles.continueButton}
          />
          <Button
            title="Back"
            onPress={() => router.back()}
            variant="ghost"
            size="large"
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
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  roles: {
    gap: 16,
    marginBottom: 24,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  selectedRadio: {
    borderColor: Colors.primary,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  actions: {
    gap: 12,
    paddingBottom: 40,
  },
  continueButton: {
    width: '100%',
  },
});