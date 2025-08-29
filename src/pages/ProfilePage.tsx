import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Phone, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileData {
  full_name: string;
  email: string;
  address: any;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    }
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfileData({
          full_name: data.full_name || '',
          email: data.email || user?.email || '',
          address: data.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            phone: ''
          }
        });
      } else {
        // Create profile if it doesn't exist
        setProfileData({
          full_name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            phone: ''
          }
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: profileData.full_name,
          email: profileData.email,
          address: profileData.address
        });

      if (error) throw error;

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-deep-teal to-deep-teal/90 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-warm-gold rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{profileData.full_name || 'Your Profile'}</h1>
                  <p className="text-cream/80">{profileData.email}</p>
                </div>
              </div>
              <button
                onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                className="bg-warm-gold hover:bg-warm-gold/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-deep-teal mb-4">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{profileData.full_name || 'Not set'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 py-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{profileData.email}</span>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-deep-teal mb-4">Address Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.address?.phone || ''}
                      onChange={(e) => handleInputChange('address.phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                      placeholder="+91 9737940267"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{profileData.address?.phone || 'Not set'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address?.street || ''}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                      placeholder="123 Main Street"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 py-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{profileData.address?.street || 'Not set'}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.address?.city || ''}
                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                        placeholder="Ahmedabad"
                      />
                    ) : (
                      <span className="py-2 block">{profileData.address?.city || 'Not set'}</span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.address?.state || ''}
                        onChange={(e) => handleInputChange('address.state', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                        placeholder="Gujarat"
                      />
                    ) : (
                      <span className="py-2 block">{profileData.address?.state || 'Not set'}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address?.zipCode || ''}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal"
                      placeholder="380001"
                    />
                  ) : (
                    <span className="py-2 block">{profileData.address?.zipCode || 'Not set'}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="bg-deep-teal hover:bg-deep-teal/90 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;