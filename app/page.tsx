import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import MainContainer from "@/components/MainContainer";
import { events } from "@/lib/constant";

const Page = () => {
  return (
    <MainContainer>
      <section>
        <h1 className="text-center pt-20">
          The hub for every Developer <br /> Event that you can&apos;t miss.
        </h1>
        <p className="text-center text-white mt-5">
          Hackatons ,Meetups and Conferences , all in one place.
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Feature events</h3>
          <ul className="events">
            {events.map((event, i) => (
              <EventCard
                key={i}
                image={event.image}
                title={event.title}
                time={event.time}
                date={event.date}
                location={event.location}
                slug={event.slug}
              />
            ))}
          </ul>
        </div>
      </section>
    </MainContainer>
  );
};

export default Page;
