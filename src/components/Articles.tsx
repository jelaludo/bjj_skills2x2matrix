import React, { useState, useEffect } from 'react';

const Articles: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    // For now, we'll display a placeholder content
    // In a real implementation, you'd extract text from the PDF
    setContent(`
# Coaching Advice for Grappling Athletes: Wrestling, Judo, and BJJ

## Introduction

This document provides essential coaching advice for grappling athletes across wrestling, judo, and Brazilian Jiu-Jitsu (BJJ). The principles outlined here are fundamental to developing effective grappling skills and competitive success.

## Core Principles

### 1. Position Before Submission
- Always establish and maintain dominant positions before attempting submissions
- Focus on control and pressure rather than rushing to finish
- Understand the hierarchy of positions in your specific discipline

### 2. Pressure and Control
- Apply consistent pressure to wear down opponents
- Use your body weight effectively to control positions
- Maintain control through proper grips and body positioning

### 3. Technique Over Strength
- Prioritize proper technique execution over raw strength
- Focus on leverage and mechanical advantage
- Develop technical proficiency through repetition and drilling

## Wrestling Fundamentals

### Stance and Movement
- Maintain a balanced, athletic stance
- Keep your feet shoulder-width apart
- Stay on the balls of your feet for quick movement
- Use level changes to set up attacks

### Takedown Defense
- Keep your head up and back straight
- Maintain good posture to prevent easy takedowns
- Use sprawls and hip control to defend shots
- Develop strong hand fighting skills

## Judo Principles

### Grip Fighting
- Establish dominant grips early in the match
- Control your opponent's lapel and sleeve
- Use grip breaks to create opportunities
- Maintain grip advantage throughout the exchange

### Throwing Mechanics
- Focus on proper kuzushi (breaking balance)
- Use your entire body in throwing movements
- Execute throws with commitment and follow-through
- Practice throws from both sides

## BJJ Strategy

### Guard Play
- Develop a strong guard game as your foundation
- Learn to sweep and submit from various guard positions
- Use guard retention to prevent passes
- Transition between different guard types fluidly

### Passing and Top Control
- Develop systematic guard passing techniques
- Maintain pressure and control when on top
- Use proper weight distribution to control positions
- Advance position methodically

## Mental Preparation

### Competition Mindset
- Develop mental toughness through consistent training
- Focus on process over outcome
- Stay composed under pressure
- Learn from both victories and defeats

### Goal Setting
- Set specific, measurable goals for improvement
- Break down complex skills into manageable components
- Track progress and adjust training accordingly
- Maintain long-term perspective on development

## Physical Conditioning

### Strength Training
- Focus on functional strength relevant to grappling
- Develop core strength for stability and power
- Include pulling and pushing movements
- Maintain flexibility and mobility

### Cardiovascular Fitness
- Build endurance for competition demands
- Include high-intensity interval training
- Develop recovery capacity between rounds
- Balance cardio with skill development

## Technical Development

### Drilling and Repetition
- Practice techniques thousands of times
- Focus on perfect form in drilling
- Gradually increase resistance and speed
- Use positional sparring to develop skills

### Video Analysis
- Study your own matches and training
- Analyze successful athletes in your discipline
- Identify areas for improvement
- Learn from different styles and approaches

## Competition Strategy

### Match Planning
- Develop a game plan for each opponent
- Adapt strategy based on opponent's strengths
- Stay flexible and adjust during the match
- Focus on your strengths while exploiting weaknesses

### Mental Preparation
- Develop pre-competition routines
- Manage nerves and anxiety effectively
- Stay focused on the present moment
- Maintain confidence in your abilities

## Recovery and Injury Prevention

### Rest and Recovery
- Allow adequate time for recovery between sessions
- Listen to your body and avoid overtraining
- Include active recovery methods
- Prioritize sleep and nutrition

### Injury Prevention
- Warm up properly before training
- Use proper technique to avoid injury
- Address minor issues before they become serious
- Maintain flexibility and mobility

## Long-term Development

### Skill Progression
- Focus on fundamentals before advanced techniques
- Build a solid foundation in your primary discipline
- Cross-train to develop well-rounded skills
- Continue learning throughout your career

### Character Development
- Develop discipline and work ethic
- Show respect for training partners and coaches
- Maintain humility and continuous improvement mindset
- Use grappling as a vehicle for personal growth

## Conclusion

Success in grappling requires dedication, proper technique, and mental fortitude. Focus on developing a strong foundation, maintaining consistent training habits, and approaching your development with patience and persistence. Remember that the journey of improvement is ongoing, and every training session is an opportunity to get better.

The principles outlined in this document provide a framework for developing as a grappling athlete. Adapt these concepts to your specific discipline and individual needs, always maintaining focus on proper technique and continuous improvement.
    `);
  }, []);

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
      backgroundColor: '#fff'
    }}>
      <div style={{
        whiteSpace: 'pre-line',
        fontSize: '16px'
      }}>
        {content}
      </div>
      
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #ccc',
        fontSize: '14px',
        color: '#666'
      }}>
        <p>
          <strong>Note:</strong> This is a placeholder content based on the PDF "Coaching Advice for Grappling Athletes: Wrestling, Judo, and BJJ". 
          In a production environment, this would display the actual extracted text from the PDF file.
        </p>
        <p>
          <strong>Design Philosophy:</strong> Ultra-lightweight, minimalist design inspired by 
          <a href="https://thebestmotherfucking.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            thebestmotherfucking.website
          </a> and 
          <a href="http://bettermotherfuckingwebsite.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            bettermotherfuckingwebsite.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Articles; 