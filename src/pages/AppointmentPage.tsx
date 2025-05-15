import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Appointment } from '../types/appointment';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Calendar, Clock, X, Check, AlertTriangle } from 'lucide-react';

const AppointmentPage: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch user's appointments from Supabase
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            *,
            service:services (
              name,
              price,
              duration
            )
          `)
          .eq('client_id', user.id)
          .order('appointment_date', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setAppointments(data);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to load appointments. Please try again later.');
        
        // Fallback data for demo purposes
        setAppointments([
          {
            id: 1,
            client_id: user.id || '',
            service_id: 1,
            appointment_date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
            status: 'confirmed',
            created_at: new Date().toISOString(),
            client_name: 'Jane Doe',
            client_email: 'jane@example.com',
            client_phone: '(555) 123-4567',
            notes: 'Please use non-toxic polish.',
            service: {
              name: 'Gel Manicure',
              price: 40,
              duration: 45
            }
          },
          {
            id: 2,
            client_id: user.id || '',
            service_id: 3,
            appointment_date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
            status: 'completed',
            created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
            client_name: 'Jane Doe',
            client_email: 'jane@example.com',
            client_phone: '(555) 123-4567',
            notes: null,
            service: {
              name: 'Luxury Pedicure',
              price: 55,
              duration: 60
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const cancelAppointment = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('client_id', user?.id || '');
      
      if (error) throw error;
      
      // Update local state
      setAppointments(appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: 'cancelled' } 
          : appointment
      ));
      
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge text="Pending" color="yellow" icon={<AlertTriangle size={14} />} />;
      case 'confirmed':
        return <Badge text="Confirmed" color="green" icon={<Check size={14} />} />;
      case 'completed':
        return <Badge text="Completed" color="blue" icon={<Check size={14} />} />;
      case 'cancelled':
        return <Badge text="Cancelled" color="red" icon={<X size={14} />} />;
      default:
        return <Badge text={status} color="gray" />;
    }
  };

  // Separate upcoming and past appointments
  const now = new Date();
  const upcomingAppointments = appointments.filter(
    app => new Date(app.appointment_date) > now && app.status !== 'cancelled'
  );
  const pastAppointments = appointments.filter(
    app => new Date(app.appointment_date) <= now || app.status === 'cancelled'
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif font-medium text-gray-800 mb-8">My Appointments</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">
            {error}
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You don't have any appointments yet.</p>
            <a 
              href="/booking" 
              className="inline-block px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors"
            >
              Book Now
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingAppointments.map(appointment => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      onCancel={() => cancelAppointment(appointment.id)}
                      getStatusBadge={getStatusBadge}
                      showCancelButton={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-600">No upcoming appointments.</p>
                </div>
              )}
            </div>
            
            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-4">Past Appointments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastAppointments.map(appointment => (
                    <AppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                      onCancel={() => {}}
                      getStatusBadge={getStatusBadge}
                      showCancelButton={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: () => void;
  getStatusBadge: (status: string) => JSX.Element;
  showCancelButton: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onCancel, 
  getStatusBadge,
  showCancelButton
}) => {
  const appointmentDate = new Date(appointment.appointment_date);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-800">{appointment.service?.name}</h3>
          {getStatusBadge(appointment.status)}
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{format(appointmentDate, 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>{format(appointmentDate, 'h:mm a')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Стоимость:</span>
            <span>₽{appointment.service?.price}</span>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="bg-gray-50 p-3 rounded-md text-gray-600 text-sm mb-4">
            <p className="font-medium mb-1">Special Requests:</p>
            <p>{appointment.notes}</p>
          </div>
        )}
        
        {showCancelButton && appointment.status !== 'cancelled' && (
          <button
            onClick={onCancel}
            className="w-full py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            Cancel Appointment
          </button>
        )}
      </div>
    </div>
  );
};

interface BadgeProps {
  text: string;
  color: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ text, color, icon }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default AppointmentPage;