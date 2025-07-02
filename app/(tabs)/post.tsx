import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Camera, Image as ImageIcon, MapPin, Tag, Package } from 'lucide-react-native';
import { ITEM_CATEGORIES, CONDITIONS, AGE_GROUPS } from '@/constants/categories';

export default function PostScreen() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    ageGroup: '',
    size: '',
    brand: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = () => {
    // In a real app, this would open image picker
    Alert.alert('Image Picker', 'Choose an option', [
      { text: 'Camera', onPress: () => {} },
      { text: 'Gallery', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handlePost = async () => {
    if (!formData.title || !formData.description || !formData.category || !formData.condition) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Your item has been posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        condition: '',
        ageGroup: '',
        size: '',
        brand: '',
      });
      setImages([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to post item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Post an Item</Text>
        <Text style={styles.subtitle}>Share items your little one has outgrown</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Photos</Text>
          <Text style={styles.sectionSubtitle}>Add up to 5 photos of your item</Text>
          
          <View style={styles.imageGrid}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            ))}
            {images.length < 5 && (
              <TouchableOpacity style={styles.addImageButton} onPress={handleImagePicker}>
                <Camera size={24} color={Colors.text.secondary} />
                <Text style={styles.addImageText}>
                  {images.length === 0 ? 'Add Photos' : 'Add More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Item Details</Text>
          
          <Input
            label="Title *"
            placeholder="e.g., Baby Stroller - Like New"
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
            leftIcon={<Tag size={20} color={Colors.text.secondary} />}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description *</Text>
            <Input
              placeholder="Describe the item, its condition, and any important details..."
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: 'top' }}
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Brand (Optional)"
              placeholder="e.g., Graco, Fisher-Price"
              value={formData.brand}
              onChangeText={(text) => setFormData(prev => ({ ...prev, brand: text }))}
              style={styles.halfInput}
            />
            <Input
              label="Size (Optional)"
              placeholder="e.g., 0-3M, Large"
              value={formData.size}
              onChangeText={(text) => setFormData(prev => ({ ...prev, size: text }))}
              style={styles.halfInput}
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>🏷️ Category & Condition</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <View style={styles.categoryOptions}>
                {ITEM_CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryOption,
                      formData.category === category.id && styles.selectedOption
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, category: category.id }))}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      formData.category === category.id && styles.selectedOptionText
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Condition *</Text>
            <View style={styles.conditionOptions}>
              {CONDITIONS.map((condition) => (
                <TouchableOpacity
                  key={condition.id}
                  style={[
                    styles.conditionOption,
                    formData.condition === condition.id && styles.selectedCondition
                  ]}
                  onPress={() => setFormData(prev => ({ ...prev, condition: condition.id }))}
                >
                  <Text style={[
                    styles.conditionName,
                    formData.condition === condition.id && styles.selectedConditionText
                  ]}>
                    {condition.name}
                  </Text>
                  <Text style={[
                    styles.conditionDescription,
                    formData.condition === condition.id && styles.selectedConditionText
                  ]}>
                    {condition.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age Group (Optional)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ageScroll}>
              <View style={styles.ageOptions}>
                {AGE_GROUPS.map((age, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.ageOption,
                      formData.ageGroup === age && styles.selectedOption
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, ageGroup: age }))}
                  >
                    <Text style={[
                      styles.ageOptionText,
                      formData.ageGroup === age && styles.selectedOptionText
                    ]}>
                      {age}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Pickup Location</Text>
          <TouchableOpacity style={styles.locationButton}>
            <MapPin size={20} color={Colors.primary} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>Brooklyn, NY 11201</Text>
              <Text style={styles.locationSubtext}>Tap to change location</Text>
            </View>
          </TouchableOpacity>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Post Item"
            onPress={handlePost}
            loading={loading}
            size="large"
            style={styles.postButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  addImageText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  categoryScroll: {
    marginHorizontal: -16,
  },
  categoryOptions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  selectedOptionText: {
    color: Colors.white,
  },
  conditionOptions: {
    gap: 8,
  },
  conditionOption: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCondition: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  conditionName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  conditionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  selectedConditionText: {
    color: Colors.white,
  },
  ageScroll: {
    marginHorizontal: -16,
  },
  ageOptions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  ageOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ageOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  locationSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  actions: {
    padding: 20,
  },
  postButton: {
    width: '100%',
  },
});