import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { founder, team } from "@/data/siteData";
import { MOTION } from "@/lib/motion";

type TeamMember = (typeof team)[number];

const TEAM_CARD_BACKGROUND = {
  backgroundImage:
    "radial-gradient(circle at 50% 40%, rgba(20, 112, 255, 0.45), transparent 48%), linear-gradient(145deg, #062b68 0%, #0758bd 48%, #031b43 100%)",
};

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: MOTION.reveal,
        delay: reduceMotion ? 0 : index * MOTION.stagger,
        ease: MOTION.ease,
      }}
      style={TEAM_CARD_BACKGROUND}
      className="group relative isolate aspect-[0.82/1] w-full overflow-hidden rounded-[18px] border border-blue-300/25 shadow-[0_14px_35px_rgba(6,26,58,0.09)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/70 hover:shadow-[0_18px_42px_rgba(7,93,219,0.18)]"
    >
      <img
        src={member.image}
        alt={`${member.name}, ${member.role} at Sky Designers`}
        width={1080}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain object-bottom transition duration-500 ease-out group-hover:scale-[1.02]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#031127] via-[#061a3a]/15 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <h3 className="font-heading text-xl font-bold tracking-[-0.02em]">{member.name}</h3>
        <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-200 sm:text-xs">
          {member.role}
        </p>
      </div>
    </motion.article>
  );
};

const TeamSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="section-space bg-[#f7f9fc] pb-32 sm:pb-36 lg:pb-40"
    >
      <div className="site-container">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
            className="max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#075ddb]" aria-hidden="true" />
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#075ddb]">
                Our Team
              </p>
            </div>
            <h2
              id="team-heading"
              className="text-balance font-heading text-3xl font-bold tracking-[-0.04em] text-[#061a3a] sm:text-4xl lg:text-5xl"
            >
              Meet the people behind Sky Designers
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085] sm:text-lg">
              A hands-on team bringing together strategy, content, design, advertising, and client
              support to help brands grow.
            </p>
          </motion.div>

          <Link
            to="/careers"
            className="group inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl bg-[#075ddb] px-5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(7,93,219,0.2)] transition hover:-translate-y-0.5 hover:bg-[#064fbb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075ddb] focus-visible:ring-offset-2"
          >
            Join Our Team
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
          className="group relative mt-12 min-h-[610px] overflow-hidden rounded-[26px] border border-blue-300/20 bg-gradient-to-br from-[#061a3a] via-[#074fac] to-[#061f3a] shadow-[0_22px_55px_rgba(6,26,58,0.18)] sm:min-h-[680px] lg:min-h-[460px]"
        >
          <div className="relative z-10 flex min-h-[610px] max-w-xl flex-col justify-start p-7 text-white sm:min-h-[680px] sm:p-10 lg:min-h-[460px] lg:w-[53%] lg:justify-center lg:p-14">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-200">
              {founder.role}
            </p>
            <h3 className="mt-4 font-heading text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              {founder.name}
            </h3>
            <p className="mt-5 max-w-lg text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
              {founder.description}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[58%] sm:h-[62%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[54%]">
            <img
              src={founder.image}
              alt={`${founder.name}, ${founder.role} at Sky Designers`}
              width={1080}
              height={1440}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain object-bottom transition duration-500 ease-out group-hover:scale-[1.02] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_18%)]"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061a3a]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#061a3a]/25 lg:via-transparent lg:to-transparent"
            aria-hidden="true"
          />
        </motion.article>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <TeamCard key={member.sortOrder} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
