import { Heart, Download, MapPin, Eye } from "lucide-react";

export const photos = [
  {
    title: "Mountain Lake at Dawn",
    author: "Elena Vasquez",
    location: "Patagonia, Argentina",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    height: "h-64",
    likes: 2847,
  },
  {
    title: "Urban Geometry",
    author: "Kenji Tanaka",
    location: "Tokyo, Japan",
    gradient: "from-slate-400 via-zinc-500 to-gray-700",
    height: "h-48",
    likes: 1523,
  },
  {
    title: "Desert Sunset Bloom",
    author: "Amara Osei",
    location: "Sahara, Morocco",
    gradient: "from-amber-400 via-orange-500 to-red-600",
    height: "h-72",
    likes: 4102,
  },
  {
    title: "Emerald Canopy",
    author: "Liam Brennan",
    location: "Olympic NP, USA",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    height: "h-56",
    likes: 987,
  },
  {
    title: "Coastal Fog",
    author: "Sofia Lindgren",
    location: "Lofoten, Norway",
    gradient: "from-gray-300 via-slate-400 to-blue-500",
    height: "h-60",
    likes: 3215,
  },
  {
    title: "Neon Reflections",
    author: "Kenji Tanaka",
    location: "Osaka, Japan",
    gradient: "from-pink-500 via-fuchsia-500 to-purple-600",
    height: "h-52",
    likes: 5673,
  },
  {
    title: "Lavender Fields Forever",
    author: "Claire Dubois",
    location: "Provence, France",
    gradient: "from-violet-400 via-purple-400 to-indigo-500",
    height: "h-64",
    likes: 2341,
  },
  {
    title: "Glacial Blue",
    author: "Erik Johansson",
    location: "Jokulsarlon, Iceland",
    gradient: "from-cyan-300 via-sky-400 to-blue-600",
    height: "h-48",
    likes: 1892,
  },
  {
    title: "Autumn in the Valley",
    author: "Mia Chen",
    location: "Yosemite, USA",
    gradient: "from-yellow-400 via-orange-400 to-red-500",
    height: "h-72",
    likes: 6120,
  },
  {
    title: "Midnight Architecture",
    author: "Aleksei Petrov",
    location: "St. Petersburg, Russia",
    gradient: "from-indigo-600 via-blue-700 to-slate-800",
    height: "h-56",
    likes: 1445,
  },
  {
    title: "Tropical Horizon",
    author: "Isabella Moreno",
    location: "Bali, Indonesia",
    gradient: "from-teal-400 via-emerald-400 to-cyan-500",
    height: "h-60",
    likes: 3789,
  },
  {
    title: "Cherry Blossom Path",
    author: "Yuki Sato",
    location: "Kyoto, Japan",
    gradient: "from-pink-300 via-rose-400 to-pink-500",
    height: "h-52",
    likes: 7234,
  },
];

export function formatLikes(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function PhotoGallery() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="group relative break-inside-avoid rounded-2xl overflow-hidden"
          >
            <div
              className={`relative w-full ${photo.height} bg-gradient-to-br ${photo.gradient}`}
            >
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='0.6'/%3E%3C/g%3E%3C/svg%3E\")",
                }}
              />
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <h3 className="text-sm font-semibold text-white leading-tight">
                {photo.title}
              </h3>
              <p className="mt-1 text-xs text-white/70">by {photo.author}</p>
              <div className="mt-1.5 flex items-center gap-1 text-xs text-white/60">
                <MapPin className="size-3" />
                {photo.location}
              </div>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-1 group-hover:translate-y-0">
              <button
                type="button"
                className="flex items-center justify-center size-8 rounded-xl bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-red-500 transition-colors shadow-sm cursor-pointer"
                aria-label="Like"
              >
                <Heart className="size-4" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center size-8 rounded-xl bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-gray-900 transition-colors shadow-sm cursor-pointer"
                aria-label="Download"
              >
                <Download className="size-4" />
              </button>
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <span className="flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 text-xs text-white/80 backdrop-blur-sm">
                <Eye className="size-3" />
                {formatLikes(photo.likes * 3)}
              </span>
              <span className="flex items-center gap-1 rounded-lg bg-black/40 px-2 py-1 text-xs text-white/80 backdrop-blur-sm">
                <Heart className="size-3" />
                {formatLikes(photo.likes)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
