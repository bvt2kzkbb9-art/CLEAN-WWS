export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset || '')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) throw new Error('Failed to upload image')
  return response.json()
}
