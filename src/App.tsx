/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { MembershipPlans } from './components/MembershipPlans';
import { WorkoutTracks } from './components/WorkoutTracks';
import { DashboardPreview } from './components/DashboardPreview';
import { Facilities } from './components/Facilities';
import { Trainers } from './components/Trainers';
import { RegistrationForm } from './components/RegistrationForm';
import { Footer } from './components/Footer';
import { RoleType } from './types/gym';
import { seedInitialFirestoreData } from './firebase/services';

export default function App() {
  const [currentRole, setCurrentRole] = useState<RoleType>('member');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('premium');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeRegisteredMember, setActiveRegisteredMember] = useState<{
    name: string;
    email: string;
    phone: string;
    plan: string;
    preferredTime: string;
    memberId: string;
    joinDate: string;
    activeStatus: string;
  } | null>(null);

  // Initialize Firestore collections & track active section on scroll
  useEffect(() => {
    seedInitialFirestoreData().catch(() => {});

    const handleScroll = () => {
      const sections = ['home', 'plans', 'tracks', 'dashboard', 'coaches', 'facility', 'register'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    scrollToSection('register');
  };

  const handleRegistrationComplete = (details: {
    name: string;
    email: string;
    phone: string;
    plan: string;
    preferredTime: string;
    memberId: string;
    joinDate: string;
    activeStatus: string;
  }) => {
    setActiveRegisteredMember(details);
    setCurrentRole('member');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Fixed Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          scrollToSection('dashboard');
        }}
        onNavigateToRegister={(planId) => {
          if (planId) setSelectedPlanId(planId);
          scrollToSection('register');
        }}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartJourney={() => scrollToSection('register')}
          onExplorePlans={() => scrollToSection('plans')}
        />

        {/* Benefits Section */}
        <Benefits />

        {/* Membership Plans Section */}
        <MembershipPlans onSelectPlan={handleSelectPlan} />

        {/* Workout Tracks Dashboard Section */}
        <WorkoutTracks />

        {/* Unified Dashboard Preview (Member / Trainer / Admin) */}
        <DashboardPreview
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          onOpenRegisterModal={() => scrollToSection('register')}
          activeMember={activeRegisteredMember}
        />

        {/* Trainer Highlights Section */}
        <Trainers />

        {/* Facilities Section */}
        <Facilities />

        {/* Registration / Enrollment Form */}
        <RegistrationForm
          selectedPlanId={selectedPlanId}
          onPlanChange={setSelectedPlanId}
          onRegistrationComplete={handleRegistrationComplete}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
