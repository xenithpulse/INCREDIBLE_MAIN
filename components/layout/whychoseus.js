// whyChooseUs.js
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import Center from '@/homecenter';
import {
  Section,
  Heading,
  Subheading,
  Description,
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
  GradientTitle,
} from '@/components/styled/whychoose_sty';
import styled from 'styled-components';



const WhyChooseUs = () => {
  const [stats, setStats] = useState({
    years: 0,
    clients: 0,
    team: 0,
    projects: 0,
  });

  const sectionRef = useRef(null);
  const scrollTriggerRef = useRef(null); // Ref to store ScrollTrigger instance

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import ScrollTrigger to prevent server-side errors
      import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
        const ScrollTrigger = ScrollTriggerModule.default;

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        const targetStats = {
          years: 6,
          clients: 15,
          team: 20,
          satisfiedcustomers: 5000,
        };

        const duration = 4000; // Animation duration in ms
        const incrementStep = 20; // Step interval in ms

        const incrementStats = (key, target) => {
          let current = 0;
          const increment = Math.ceil(target / (duration / incrementStep));

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            setStats((prev) => ({ ...prev, [key]: current }));
          }, incrementStep);
        };

        const animateStats = () => {
          Object.entries(targetStats).forEach(([key, value]) => incrementStats(key, value));
        };

        // Create ScrollTrigger instance
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top center',
          onEnter: animateStats,
        });
      });
    }

    // Cleanup ScrollTrigger on unmount
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <GradientTitle>Uncompromising Quality</GradientTitle>
      <Subheading> Design-Driven Home Essentials</Subheading> {/* Translate subtitle */}
      <Description>
      Creating a beautiful home shouldn't break the bank. <strong style={{color:"#00BFFF"}}>INCREDIBLE HOMES </strong>
       offers a wide range of stylish and functional home decor and 
       household essentials at accessible prices, making quality design available to everyone.
    </Description>
      <StatsContainer>
        <StatItem>
          <StatNumber>{stats.years}+</StatNumber>
          <StatLabel>Years Of Experience</StatLabel> {/* Translate label */}
        </StatItem>
        <StatItem>
          <StatNumber>{stats.clients}</StatNumber>
          <StatLabel>Active Clients</StatLabel> {/* Translate label */}
        </StatItem>
        <StatItem>
          <StatNumber>{stats.team}</StatNumber>
          <StatLabel>Team Members</StatLabel> {/* Translate label */}
        </StatItem>
        <StatItem>
          <StatNumber>{stats.satisfiedcustomers}+</StatNumber>
          <StatLabel>Satisfied Customers</StatLabel> {/* Translate label */}
        </StatItem>
      </StatsContainer>
    </Section>
  );
};

export default WhyChooseUs;