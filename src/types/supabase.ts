export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          duration: number
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          duration: number
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          duration?: number
          image_url?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: number
          client_id: string
          service_id: number
          appointment_date: string
          status: string
          created_at: string
          client_name: string
          client_email: string
          client_phone: string
          notes: string | null
        }
        Insert: {
          id?: number
          client_id?: string
          service_id: number
          appointment_date: string
          status?: string
          created_at?: string
          client_name: string
          client_email: string
          client_phone: string
          notes?: string | null
        }
        Update: {
          id?: number
          client_id?: string
          service_id?: number
          appointment_date?: string
          status?: string
          created_at?: string
          client_name?: string
          client_email?: string
          client_phone?: string
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}