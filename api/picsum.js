export async function getList(page = 1) {
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
  const photos = await response.json();
  return photos;
}

export function formatPhotoUri(id, width, height) {
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}
