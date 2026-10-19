import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  time: string;
  location: string;
  date: string;
  slug?: string;
};
const EventCard = ({ title, image, time, location, date, slug }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        width={200}
        height={200}
        className="poster"
        alt="event-poster"
      />
      <div className="flex gap-2 items-start">
        <Image
          src="/icons/pin.svg"
          alt="location-icon"
          width={14}
          height={14}
        />
        <p className="line-clamp-2">{location}</p>
      </div>

      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="calendar-icon"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <p> {time}</p>
      </div>
    </Link>
  );
};

export default EventCard;
