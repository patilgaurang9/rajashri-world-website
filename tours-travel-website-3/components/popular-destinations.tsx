import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Bali",
    slug: "bali-trip-2025",
    image: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/bali-image.jpg",
    desc: "Tropical paradise with beaches & temples."
  },
  {
    name: "Dubai",
    slug: "dubai-adventure-2025",
    image: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/dubai.jpg",
    desc: "Luxury, adventure, and desert wonders."
  },
  {
    name: "Manali",
    slug: "manali-diwali-special-2025",
    image: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/manali-image.jpg",
    desc: "Snow-capped peaks and scenic valleys."
  },
  {
    name: "Goa",
    slug: "goa-family-tour-nov-2025",
    image: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/goa.jpg",
    desc: "Vibrant peaceful beaches and nightlife."
  },
];

export function PopularDestinations() {
  return (
    <section className="py-4 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div key={dest.name} className="group relative rounded-xl overflow-hidden shadow-lg flex flex-col items-center">
              <div className="relative w-full h-64">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Overlay for title/desc */}
                <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
                  <div className="text-2xl font-bold text-white mb-1 text-left drop-shadow-lg">{dest.name}</div>
                  <div className="text-gray-200 text-md text-left drop-shadow">{dest.desc}</div>
                </div>
                {/* Explore button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <Link href={`/tours/${dest.slug}`}>
                    <button className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-full shadow hover:bg-gray-100 transition-all text-lg">Explore</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
