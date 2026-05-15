import { createClient } from '@supabase/supabase-js'

// URL base do projeto (sem /rest/v1/)
const supabaseUrl = 'https://takkoosggyockvgawvjr.supabase.co'
const supabaseKey = 'sb_publishable_QB769xHsGisoXBH2JFCJzA_7i-gT11C'

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Lista todas as imagens de um bucket do Supabase Storage.
 * @param {string} bucketName - Nome do bucket (ex: "Bonecos Marvel")
 * @returns {Promise<Array>} - Array de objetos { name, url }
 */
export async function listBucketImages(bucketName) {
  const { data, error } = await supabase.storage.from(bucketName).list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })

  if (error) {
    console.error('Erro ao listar imagens do Supabase:', error.message)
    return []
  }

  // Filtra apenas arquivos de imagem e gera URL pública para cada um
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const images = (data || [])
    .filter((file) => {
      const ext = file.name.split('.').pop().toLowerCase()
      return imageExtensions.includes(ext)
    })
    .map((file) => {
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(file.name)
      return {
        name: file.name,
        url: urlData.publicUrl,
      }
    })

  return images
}