import { openDB } from "idb";

const dbPromise = openDB("hotkeyhero", 1, {
  upgrade(db) {
    const store = db.createObjectStore("unsplash", { autoIncrement: true });
  },
});

export const getImage = async (by) => {
  const storeName = "unsplash";
  let db = await dbPromise;
  // 15 minutes ago
  const expiration = Date.now() - 15 * 60 * 1000;
  
  let data = await db.get("unsplash", 1);
  if (data) {
    // console.log(data);
    // console.log("d",data.createdAt, expiration,data.created < expiration)
    if(data.createdAt < expiration) { refreshImages(db); }
  } else {
    data = await refreshImages(db);
  }

  // Nothing cached, load and way
  return {
      url: URL.createObjectURL(data.image),
      meta: data.meta
  }  
};

export async function refreshImages(db, by) {
  const response = await fetch("https://unsplash.andersaberg.com");
  const data = await response.json();
  const blob = await fetchImageData(data.urls.raw);

  // Update cache
  db.delete("unsplash", 1);
  db.put(
    "unsplash",
    {
      createdAt: Date.now(),
      image: blob,
      meta: data,
    },
    1
  );

  return {
      meta: data,
      image: blob
  }
}

async function fetchImageData(url) {
  const quality = 85; // range [0-100]
  const width = calculateWidth(window.innerWidth);

  const params = new URLSearchParams({
    q: String(quality),
    w: String(width),
  });

  return await (await fetch(url + params)).blob();
}

/**
 * Calculate width to fetch image, tuned for Unsplash cache performance.
 */
export function calculateWidth(screenWidth = 1920) {
  // Consider a minimum resolution too
  screenWidth = Math.max(screenWidth, 1920); // Lower limit at 1920
  screenWidth = Math.min(screenWidth, 3840); // Upper limit at 4K
  screenWidth = Math.ceil(screenWidth / 240) * 240; // Snap up to nearest 240px for improved caching
  return screenWidth;
}