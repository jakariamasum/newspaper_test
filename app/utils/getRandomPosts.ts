export const getRandomPosts = (posts: any, count: number) => {
  const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
  return shuffledPosts.slice(0, count);
};
