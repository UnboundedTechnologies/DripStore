import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '7iov4l55',
    dataset: 'production',
    apiVersion:'2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const buidler = imageUrlBuilder(client);

export const urlFor = (source) => {
    return buidler.image(source);
}