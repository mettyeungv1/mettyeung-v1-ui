"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PersonDetailModal } from '@/components/person/person-detail-modal';
import { Person } from '@/lib/stores/person-store';

interface PersonCardProps {
  person: Person;
  variant?: 'compact' | 'detailed';
  index: number;
}

export function PersonCard({ person, variant = 'compact', index }: PersonCardProps) {
  const [showModal, setShowModal] = useState(false);

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="text-center hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6">
            <Avatar className="w-16 h-16 mx-auto mb-4 ring-2 ring-gray-100 group-hover:ring-khmer-gold transition-all duration-300">
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback className="bg-gradient-to-br from-khmer-gold to-khmer-red text-white font-bold">
                {person.name_en.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-khmer-gold transition-colors">
              {person.name_en}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{person.name}</p>
            
            <Badge className="bg-khmer-gold text-white mb-3">
              {person.position_en}
            </Badge>
            
            <p className="text-xs text-gray-600 line-clamp-2 mb-4">
              {person.bio}
            </p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowModal(true)}
              className="w-full hover:bg-khmer-gold hover:text-white hover:border-khmer-gold"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              View Profile
            </Button>
          </CardContent>
        </Card>
        
        <PersonDetailModal
          person={person}
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group border-l-4 border-l-transparent hover:border-l-khmer-gold">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-20 h-20 ring-2 ring-gray-100 group-hover:ring-khmer-gold transition-all duration-300">
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback className="bg-gradient-to-br from-khmer-gold to-khmer-red text-white font-bold">
                {person.name_en.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-khmer-gold transition-colors">
                {person.name_en}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{person.name}</p>
              
              <Badge className="bg-gradient-to-r from-khmer-gold/10 to-khmer-red/10 text-khmer-gold border-khmer-gold/20 mb-3">
                {person.position_en}
              </Badge>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {person.bio}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {person.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {person.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{person.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <a
                    href={`mailto:${person.email}`}
                    className="text-gray-600 hover:text-khmer-gold transition-colors truncate"
                  >
                    {person.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <a
                    href={`tel:${person.phone}`}
                    className="text-gray-600 hover:text-khmer-gold transition-colors"
                  >
                    {person.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{person.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">Joined {person.joinDate}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full hover:bg-khmer-gold hover:text-white hover:border-khmer-gold"
                >
                  <Link href={`/person/${person.id}`} className="flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    View Full Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}