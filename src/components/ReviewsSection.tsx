import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Shawi Rajaguru", rating: 5, text: "I am really happy to be associated with Sky Designers. They did a great job. They are a reliable place where you can get your work done without any fear. I highly recommend them. The customer service is also very good and very friendly", avatar: "JW" },
  { name: "Dinesh De silva", rating: 5, text: "Sky Designers exceeded our expectations with their outstanding work for the Ceylon Discus Club's 1st Online International Discus Competition held on June 29, 2024. Their creative touch and attention to detail made the grand ceremony truly unforgettable. The visuals were stunning, the execution flawless, and the overall experience was remarkable. We couldn't have asked for a better partner to bring our vision to life. Thank you, Sky Designers, for your exceptional service and dedication to excellence!", avatar: "MR" },
  { name: "CinePixel Agency", rating: 5, text: "Joshuwa brother absolutely nailed our campaign. The results were massive — way more than we expected. Super professional, easy to work with, and really knows his stuff. Highly recommend ", avatar: "AK" },
  { name: "Nishan Perera", rating: 5, text: "Sky Designers provided an outstanding service for our branding and digital marketing. The team was professional, creative, and delivered results beyond our expectations. Highly recommended for anyone looking to grow their business online.", avatar: "NP" },
  { name: "Harsha Abeysinghe", rating: 5, text: "I received service from a company called Sky Designers, and I must say, the results were outstanding. I’m truly at a loss for words everything was amazing! Thank you once again for your exceptional service. Highly recommended!", avatar: "LT" },
  { name: "The Infinity", rating: 5, text: "I saw this academy randomly while I was looking for something similar. Then I also read the feedbacks Sky Designers got from their clients and decided that I might seek their help to boost my posts. Which turned out to be a timely decision that I had made. Thank you so much. I am making money with what I do thanks to their help. So I highly recommend this to anybody who seeks something like this. Sky Designers is the best and the level of professionalism they have is excellent.", avatar: "LT" },

];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gradient-primary">What Clients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={idx < review.rating ? "text-accent fill-accent" : "text-muted-foreground"}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">{review.avatar}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
