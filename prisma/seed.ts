import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  await prisma.bookingInquiry.deleteMany();
  await prisma.venue.deleteMany();

  const venues = await prisma.venue.createManyAndReturn({
    data: [
      {
        name: "Grand City Hotel",
        description:
          "Luxury hotel in the heart of downtown with state-of-the-art conference facilities",
        city: "New York",
        capacity: 200,
        pricePerNight: 45000,
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        ],
        amenities: [
          "WiFi",
          "Pool",
          "Spa",
          "Conference Room",
          "Catering",
          "Parking",
        ],
      },
      {
        name: "Mountain Retreat Lodge",
        description:
          "Peaceful getaway in the mountains perfect for team building and strategy sessions",
        city: "Denver",
        capacity: 50,
        pricePerNight: 25000,
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        ],
        amenities: [
          "WiFi",
          "Fireplace",
          "Hiking Trails",
          "Team Building Activities",
          "Campfire",
        ],
      },
      {
        name: "Beachside Resort & Spa",
        description:
          "Beautiful beachfront property with modern meeting spaces and recreational facilities",
        city: "Miami",
        capacity: 150,
        pricePerNight: 35000,
        images: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        ],
        amenities: [
          "WiFi",
          "Pool",
          "Beach Access",
          "Bar",
          "Spa",
          "Water Sports",
        ],
      },
      {
        name: "Tech Hub Conference Center",
        description:
          "Modern venue specifically designed for tech events, hackathons, and product launches",
        city: "San Francisco",
        capacity: 300,
        pricePerNight: 60000,
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        ],
        amenities: [
          "WiFi",
          "Projector",
          "Whiteboards",
          "Catering",
          "Video Conferencing",
          "High-Speed Internet",
        ],
      },
      {
        name: "Historic Boston Manor",
        description:
          "Elegant historic venue for formal events, executive retreats, and corporate gatherings",
        city: "Boston",
        capacity: 80,
        pricePerNight: 40000,
        images: [
          "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800",
        ],
        amenities: [
          "WiFi",
          "Garden",
          "Parking",
          "Catering",
          "Historical Tours",
          "Fine Dining",
        ],
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${venues.length} venues`);

  // Create some sample bookings
  const sampleBooking = await prisma.bookingInquiry.create({
    data: {
      venueId: venues[0].id,
      companyName: "Tech Startup Inc",
      email: "events@techstartup.com",
      startDate: new Date("2024-03-15"),
      endDate: new Date("2024-03-17"),
      attendeeCount: 45,
      status: "PENDING",
    },
  });

  console.log(`Created sample booking for ${sampleBooking.companyName}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
