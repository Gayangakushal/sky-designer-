import { motion } from "framer-motion";
import Gaiyya from "../assets/gallery/Gaiyya.jpg.jpeg";
import Ishu from "../assets/gallery/Ishu.jpg.jpeg";
import Visha from "../assets/gallery/Visha.jpg.jpeg";
import josh from "../assets/gallery/hh.jpg";
import Dilshan from "../assets/gallery/dilshan.jpeg";
import Fahad from "../assets/gallery/Fahad.jpg.jpeg";
import kasuni from "../assets/gallery/kasuni.jpg.jpeg";

const team = [
  { name: "Joshuwa", role: "CEO & Founder", color: "from-pink-500 to-rose-400", image: josh },
  { name: "Ishara", role: "Social Media Manager", color: "from-accent to-yellow-300", image: Ishu },
  { name: "Gayanga", role: "Social Media Manager", color: "from-primary to-blue-400", image: Gaiyya },
  { name: "Vishma", role: "Creative Designer", color: "from-emerald-500 to-teal-400", image: Visha },
  { name: "Dilshan", role: "Paid Media Specialist", color: "from-emerald-500 to-teal-400", image: Dilshan },
  { name: "Fahad", role: "Paid Media Specialist", color: "from-emerald-500 to-teal-400", image: Fahad },
  { name: "Kasuni", role: "Assistant", color: "from-emerald-500 to-teal-400", image: kasuni },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">The Experts</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-primary">Meet Our Team</h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl glass-card p-6 text-center">
                {/* Avatar */}
                {member.image ? (
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-500">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-2xl font-heading font-bold text-background">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                )}

                <h3 className="font-heading font-semibold text-foreground text-sm">{member.name}</h3>
                <p className="text-muted-foreground text-xs mt-1">{member.role}</p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
