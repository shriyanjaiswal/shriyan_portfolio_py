import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useState, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Calendar, MapPin, GraduationCap, Trophy, Code, Target, ArrowUp, User, Clock, Award, Lightbulb} from "lucide-react";
import GlassCard from "../components/GlassCard";
import Footer from "../components/Footer";
import {usePersonalInfo} from "../hooks/usePersonalInfo";
import {useJourneyTimeline} from "../hooks/useJourneyTimeline";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

// Scroll-triggered animation component
const ScrollReveal = ({ children, direction = "up", delay = 0, threshold = 0.1 }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
      <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
      >
        {children}
      </motion.div>
  );
};

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
      <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={24} />
      </motion.button>
  );
};

// Progress bar component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
      <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 z-50 transform-gpu"
          style={{ scaleX, transformOrigin: "0%" }}
      />
  );
};

// Enhanced Timeline Item Component
const TimelineItem = ({ item, index, isVisible }) => {
  const iconMap = {
    'GraduationCap': GraduationCap,
    'Code': Code,
    'Trophy': Trophy,
    'Target': Target,
    'User': User,
    'Clock': Clock,
    'Award': Award,
    'Lightbulb': Lightbulb
  };

  const IconComponent = iconMap[item.icon] || Code;
  const isEven = index % 2 === 0;

  return (
      <div className={`relative flex items-center mb-16 ${isEven ? "flex-row" : "flex-row-reverse"}`}>
        {/* Timeline Node */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg border-4 border-white/10`}
          >
            <IconComponent size={28} className="text-white" />
          </motion.div>

          {/* Pulsing rings */}
          <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-20`}
          />
        </div>

        {/* Content Card */}
        <div className={`w-full md:w-5/12 ${isEven ? "pr-8" : "pl-8"}`}>
          <GlassCard
              variant="gradient"
              className="p-6 group hover:border-purple-500/40 transition-all duration-300"
              glow={true}
              hover={true}
          >
            <div className="space-y-4">
              <div>
                <motion.div
                    className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2 uppercase tracking-wider`}
                    whileHover={{ scale: 1.05 }}
                >
                  {item.phase}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-purple-300 font-medium mb-3">
                  <Calendar size={16} />
                  <span>{item.period}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              {item.highlights && item.highlights.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <span className="text-2xl mr-2">🚀</span>
                      Highlights
                    </h4>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, hIndex) => (
                          <motion.li
                              key={hIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isVisible ? { opacity: 1, x: 0 } : {}}
                              transition={{
                                duration: 0.5,
                                delay: 0.1 + hIndex * 0.1,
                                ease: [0.25, 0.1, 0.25, 1]
                              }}
                              className="flex items-start text-gray-300 group"
                          >
                            <motion.div
                                className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"
                                whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-sm leading-relaxed group-hover:text-white transition-colors">
                                                {highlight}
                                            </span>
                          </motion.li>
                      ))}
                    </ul>
                  </div>
              )}

              {/* Additional metrics if available */}
              {item.metrics && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/30">
                    {Object.entries(item.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-purple-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
  );
};

const About = () => {
  const { scrollY } = useScroll();
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: false });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: false });

  const { data: personalInfo, isLoading: personalLoading } = usePersonalInfo();
  const { data: timelineData, isLoading: timelineLoading } = useJourneyTimeline();

  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Add smooth scrolling effect
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (personalLoading || timelineLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
          <div className="text-center">
            <DotLottieReact
                src="https://lottie.host/206cf556-6aab-4cc8-aa2d-7598ec0fbedc/jvDXSqpSNx.lottie"
                loop
                autoplay
                className="w-64 h-64 mx-auto mb-4"
            />
            <p className="text-white text-lg">Loading about information...</p>
          </div>
        </div>
    );
  }

  if (!personalInfo || !timelineData) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
          <div className="text-center">
            <div className="text-white text-xl mb-4">Failed to load about information</div>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
    );
  }

  return (
      <>
        <ScrollProgress />
        <ScrollToTop />

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
          {/* Hero Section */}
          <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="text-center max-w-4xl mx-auto relative z-10"
            >
              <ScrollReveal direction="down">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                  {/* Profile Image */}
                  <div className="mb-12">
                    {personalInfo.image_url ? (
                        <motion.div
                            whileHover={{ scale: 1.05, rotateY: 15 }}
                            transition={{ duration: 0.3 }}
                            className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-2xl shadow-purple-500/20"
                        >
                          <img
                              src={personalInfo.image_url}
                              alt={personalInfo.name}
                              className="w-full h-full object-cover"
                          />
                        </motion.div>
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.05, rotateY: 15 }}
                            transition={{ duration: 0.3 }}
                            className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-2xl shadow-purple-500/20 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                        >
                          <div className="text-6xl font-bold text-white">
                            {personalInfo.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </motion.div>
                    )}
                  </div>

                  <h1 className="text-6xl md:text-8xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        About Me
                                    </span>
                  </h1>

                  <div className="space-y-6 mb-12">
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      {personalInfo.bio}
                    </p>

                    {personalInfo.quote && (
                        <ScrollReveal direction="up" delay={0.3}>
                          <motion.blockquote
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ duration: 0.8, delay: 0.5 }}
                              className="text-2xl font-light italic text-purple-300 max-w-2xl mx-auto relative"
                          >
                            <span className="text-6xl text-purple-500/30 absolute -top-6 -left-4">"</span>
                            {personalInfo.quote}
                            <span className="text-6xl text-purple-500/30 absolute -bottom-8 -right-4">"</span>
                          </motion.blockquote>
                        </ScrollReveal>
                    )}
                  </div>

                  {/* Personal Details */}
                  <ScrollReveal direction="up" delay={0.4}>
                    <div className="flex flex-wrap justify-center gap-6 text-gray-300">
                      {personalInfo.location && (
                          <motion.div
                              className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          >
                            <MapPin size={20} className="text-purple-400" />
                            <span>{personalInfo.location}</span>
                          </motion.div>
                      )}
                      <motion.div
                          className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <Calendar size={20} className="text-purple-400" />
                        <span>BCA Student (2022-2025)</span>
                      </motion.div>
                      <motion.div
                          className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <Code size={20} className="text-purple-400" />
                        <span>Full Stack Developer</span>
                      </motion.div>
                    </div>
                  </ScrollReveal>

                  {/* Stats */}
                  <ScrollReveal direction="up" delay={0.5}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">2+</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-400">15+</div>
                        <div className="text-sm text-gray-400">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">25+</div>
                        <div className="text-sm text-gray-400">Technologies</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">100%</div>
                        <div className="text-sm text-gray-400">Client Satisfaction</div>
                      </div>
                    </div>
                  </ScrollReveal>
                </motion.div>
              </ScrollReveal>
            </motion.div>
          </section>

          {/* Journey Timeline */}
          <section ref={timelineRef} className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal direction="up">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        My Journey
                                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    A comprehensive roadmap of my growth from curious student to aspiring developer,
                    highlighting key milestones and achievements.
                  </p>

                  {/* Journey Stats */}
                  <div className="flex justify-center items-center space-x-8 mt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{timelineData.length}</div>
                      <div className="text-xs text-gray-400">Milestones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">3+</div>
                      <div className="text-xs text-gray-400">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400">∞</div>
                      <div className="text-xs text-gray-400">Learning</div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              <div className="relative">
                {/* Enhanced Timeline Path */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-30" />

                {/* Animated dots along the timeline */}
                <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                    animate={{
                      y: [0, "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                />

                {timelineData.map((item, index) => (
                    <ScrollReveal
                        key={item.id}
                        direction={index % 2 === 0 ? "left" : "right"}
                        delay={index * 0.2}
                    >
                      <TimelineItem
                          item={item}
                          index={index}
                          isVisible={timelineInView}
                      />
                    </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </>
  );
};

export default About;