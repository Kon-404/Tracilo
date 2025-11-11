/**
 * Supabase Storage Client
 *
 * Handles file uploads to Supabase Storage
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hzavtdbiqwtapdcvfftq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload a photo to Supabase Storage
 * @param file - The file to upload
 * @param folder - Optional folder path (e.g., 'submissions/abc123')
 * @returns Public URL of the uploaded file
 */
export async function uploadPhoto(
  file: File,
  folder?: string
): Promise<string | null> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}_${randomString}.${extension}`;
    const path = folder ? `${folder}/${filename}` : filename;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('checklist-photos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('checklist-photos')
      .getPublicUrl(path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
}

/**
 * Delete a photo from Supabase Storage
 * @param url - The public URL of the photo to delete
 * @returns Success boolean
 */
export async function deletePhoto(url: string): Promise<boolean> {
  try {
    // Extract path from URL
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex((part) => part === 'checklist-photos');
    if (bucketIndex === -1) return false;

    const path = urlParts.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from('checklist-photos')
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting photo:', error);
    return false;
  }
}
