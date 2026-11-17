export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      access_code_redemptions: {
        Row: {
          code: string
          expires_at: string
          redeemed_at: string
          user_id: string
        }
        Insert: {
          code: string
          expires_at: string
          redeemed_at?: string
          user_id: string
        }
        Update: {
          code?: string
          expires_at?: string
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_code_redemptions_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "access_codes"
            referencedColumns: ["code"]
          },
        ]
      }
      access_codes: {
        Row: {
          active: boolean
          code: string
          created_at: string
          created_by: string
          days: number
          max_uses: number
          uses: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          created_by: string
          days?: number
          max_uses?: number
          uses?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          created_by?: string
          days?: number
          max_uses?: number
          uses?: number
        }
        Relationships: []
      }
      account_role_events: {
        Row: {
          actor_id: string
          changed_at: string
          id: number
          new_role: string
          previous_roles: string[]
          user_id: string
        }
        Insert: {
          actor_id: string
          changed_at?: string
          id?: never
          new_role: string
          previous_roles: string[]
          user_id: string
        }
        Update: {
          actor_id?: string
          changed_at?: string
          id?: never
          new_role?: string
          previous_roles?: string[]
          user_id?: string
        }
        Relationships: []
      }
      account_status: {
        Row: {
          note: string
          status: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          note?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          note?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      account_status_history: {
        Row: {
          changed_by: string
          created_at: string
          id: number
          previous_status: string | null
          status: string
          user_id: string
        }
        Insert: {
          changed_by?: string
          created_at?: string
          id?: never
          previous_status?: string | null
          status: string
          user_id: string
        }
        Update: {
          changed_by?: string
          created_at?: string
          id?: never
          previous_status?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_generations: {
        Row: {
          actual_credits: number | null
          created_at: string
          document_name: string
          gateway_request_id: string | null
          id: string
          input_tokens: number | null
          model: string
          output_tokens: number | null
          questions: Json
          user_id: string
        }
        Insert: {
          actual_credits?: number | null
          created_at?: string
          document_name: string
          gateway_request_id?: string | null
          id?: string
          input_tokens?: number | null
          model: string
          output_tokens?: number | null
          questions?: Json
          user_id: string
        }
        Update: {
          actual_credits?: number | null
          created_at?: string
          document_name?: string
          gateway_request_id?: string | null
          id?: string
          input_tokens?: number | null
          model?: string
          output_tokens?: number | null
          questions?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      announcement_reads: {
        Row: {
          announcement_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          announcement_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          announcement_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcement_reads_announcement_id_fkey"
            columns: ["announcement_id"]
            isOneToOne: false
            referencedRelation: "institution_announcements"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_usage: {
        Row: {
          day: string
          questions: number
          user_id: string
        }
        Insert: {
          day: string
          questions?: number
          user_id: string
        }
        Update: {
          day?: string
          questions?: number
          user_id?: string
        }
        Relationships: []
      }
      book_topic_progress: {
        Row: {
          exercises_done: boolean
          read_done: boolean
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          exercises_done?: boolean
          read_done?: boolean
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          exercises_done?: boolean
          read_done?: boolean
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_topic_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          attempt_id: string
          canonical_payload: string | null
          evidence_ids: string[] | null
          hash: string
          holder: string
          issued_at: string
          revoked_at: string | null
          score: number
          title: string
          user_id: string
        }
        Insert: {
          attempt_id: string
          canonical_payload?: string | null
          evidence_ids?: string[] | null
          hash: string
          holder: string
          issued_at?: string
          revoked_at?: string | null
          score: number
          title: string
          user_id: string
        }
        Update: {
          attempt_id?: string
          canonical_payload?: string | null
          evidence_ids?: string[] | null
          hash?: string
          holder?: string
          issued_at?: string
          revoked_at?: string | null
          score?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: true
            referencedRelation: "practice_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_messages: {
        Row: {
          attachment_name: string | null
          attachment_path: string | null
          attachment_reviewed_at: string | null
          attachment_reviewed_by: string | null
          attachment_status: string
          body: string
          channel_id: string
          created_at: string
          hidden_at: string | null
          hidden_by: string | null
          id: string
          sender_id: string
        }
        Insert: {
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_reviewed_at?: string | null
          attachment_reviewed_by?: string | null
          attachment_status?: string
          body: string
          channel_id: string
          created_at?: string
          hidden_at?: string | null
          hidden_by?: string | null
          id?: string
          sender_id: string
        }
        Update: {
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_reviewed_at?: string | null
          attachment_reviewed_by?: string | null
          attachment_status?: string
          body?: string
          channel_id?: string
          created_at?: string
          hidden_at?: string | null
          hidden_by?: string | null
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "institution_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_reads: {
        Row: {
          channel_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          channel_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_reads_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "institution_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment_events: {
        Row: {
          actor_id: string
          created_at: string
          id: number
          request_id: string
          status: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: never
          request_id: string
          status: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: never
          request_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_events_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "enrollment_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment_pricing: {
        Row: {
          base_amount: number
          discount_amount: number
          discount_id: string | null
          discount_name: string | null
          discount_priority: number | null
          final_amount: number
          id: string
          institution_id: string
          priced_at: string
          priced_by: string
          request_id: string
          tariff_id: string
          tariff_label: string
        }
        Insert: {
          base_amount: number
          discount_amount?: number
          discount_id?: string | null
          discount_name?: string | null
          discount_priority?: number | null
          final_amount: number
          id?: string
          institution_id: string
          priced_at?: string
          priced_by: string
          request_id: string
          tariff_id: string
          tariff_label: string
        }
        Update: {
          base_amount?: number
          discount_amount?: number
          discount_id?: string | null
          discount_name?: string | null
          discount_priority?: number | null
          final_amount?: number
          id?: string
          institution_id?: string
          priced_at?: string
          priced_by?: string
          request_id?: string
          tariff_id?: string
          tariff_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_pricing_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "institution_discounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_pricing_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_pricing_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "enrollment_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_pricing_tariff_id_fkey"
            columns: ["tariff_id"]
            isOneToOne: false
            referencedRelation: "institution_tariffs"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollment_requests: {
        Row: {
          birth_date: string | null
          consent_version: string
          consented_at: string
          created_at: string
          documents: Json
          family_contact: Json
          fee_receipt_path: string | null
          guardian_id: string
          id: string
          id_photo_path: string
          institution_id: string
          level: string
          relation: string
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          student_email: string | null
          student_id_number: string
          student_name: string
          verification_hash: string | null
        }
        Insert: {
          birth_date?: string | null
          consent_version: string
          consented_at?: string
          created_at?: string
          documents?: Json
          family_contact?: Json
          fee_receipt_path?: string | null
          guardian_id?: string
          id?: string
          id_photo_path: string
          institution_id: string
          level: string
          relation: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          student_email?: string | null
          student_id_number: string
          student_name: string
          verification_hash?: string | null
        }
        Update: {
          birth_date?: string | null
          consent_version?: string
          consented_at?: string
          created_at?: string
          documents?: Json
          family_contact?: Json
          fee_receipt_path?: string | null
          guardian_id?: string
          id?: string
          id_photo_path?: string
          institution_id?: string
          level?: string
          relation?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          student_email?: string | null
          student_id_number?: string
          student_name?: string
          verification_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_requests_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_sessions: {
        Row: {
          consumed_at: string | null
          created_at: string
          deck_id: string
          id: string
          question_count: number
          subject: string
          user_id: string
        }
        Insert: {
          consumed_at?: string | null
          created_at?: string
          deck_id: string
          id?: string
          question_count: number
          subject: string
          user_id: string
        }
        Update: {
          consumed_at?: string | null
          created_at?: string
          deck_id?: string
          id?: string
          question_count?: number
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      guardian_links: {
        Row: {
          consent_version: string | null
          consented_at: string | null
          created_at: string
          guardian_id: string
          institution_id: string
          relation: string
          student_id: string
          verified_by: string
        }
        Insert: {
          consent_version?: string | null
          consented_at?: string | null
          created_at?: string
          guardian_id: string
          institution_id: string
          relation: string
          student_id: string
          verified_by: string
        }
        Update: {
          consent_version?: string | null
          consented_at?: string | null
          created_at?: string
          guardian_id?: string
          institution_id?: string
          relation?: string
          student_id?: string
          verified_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardian_links_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_additional_role_events: {
        Row: {
          actor_id: string
          can_read_reports: boolean
          changed_at: string
          id: number
          institution_id: string
          role: string
          specialty: string
          user_id: string
        }
        Insert: {
          actor_id: string
          can_read_reports: boolean
          changed_at?: string
          id?: never
          institution_id: string
          role: string
          specialty: string
          user_id: string
        }
        Update: {
          actor_id?: string
          can_read_reports?: boolean
          changed_at?: string
          id?: never
          institution_id?: string
          role?: string
          specialty?: string
          user_id?: string
        }
        Relationships: []
      }
      institution_additional_roles: {
        Row: {
          assigned_at: string
          assigned_by: string
          can_read_reports: boolean
          institution_id: string
          role: string
          specialty: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          can_read_reports?: boolean
          institution_id: string
          role: string
          specialty?: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          can_read_reports?: boolean
          institution_id?: string
          role?: string
          specialty?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_additional_roles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_announcements: {
        Row: {
          audience: string
          body: string
          created_at: string
          created_by: string
          event_at: string | null
          id: string
          institution_id: string
          kind: string
          title: string
        }
        Insert: {
          audience: string
          body: string
          created_at?: string
          created_by: string
          event_at?: string | null
          id?: string
          institution_id: string
          kind: string
          title: string
        }
        Update: {
          audience?: string
          body?: string
          created_at?: string
          created_by?: string
          event_at?: string | null
          id?: string
          institution_id?: string
          kind?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_announcements_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_area_review_history: {
        Row: {
          actor_id: string
          after_value: Json
          before_value: Json | null
          created_at: string
          id: string
          institution_id: string
          subject: string
        }
        Insert: {
          actor_id: string
          after_value: Json
          before_value?: Json | null
          created_at?: string
          id?: string
          institution_id: string
          subject: string
        }
        Update: {
          actor_id?: string
          after_value?: Json
          before_value?: Json | null
          created_at?: string
          id?: string
          institution_id?: string
          subject?: string
        }
        Relationships: []
      }
      institution_area_reviews: {
        Row: {
          institution_id: string
          reason: string
          reviewer_id: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          institution_id: string
          reason: string
          reviewer_id: string
          status: string
          subject: string
          updated_at?: string
        }
        Update: {
          institution_id?: string
          reason?: string
          reviewer_id?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_area_reviews_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_attendance_records: {
        Row: {
          arrived_at: string
          id: string
          institution_id: string
          recorded_by: string
          session_id: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          arrived_at?: string
          id?: string
          institution_id: string
          recorded_by: string
          session_id: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          arrived_at?: string
          id?: string
          institution_id?: string
          recorded_by?: string
          session_id?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_attendance_records_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_attendance_records_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "institution_attendance_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_attendance_sessions: {
        Row: {
          created_at: string
          created_by: string
          id: string
          institution_id: string
          section_id: string
          subject: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          institution_id: string
          section_id: string
          subject: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          institution_id?: string
          section_id?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_attendance_sessions_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_attendance_sessions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "institution_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_channels: {
        Row: {
          created_at: string
          id: string
          institution_id: string
          kind: string
          section_id: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          institution_id: string
          kind: string
          section_id?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          institution_id?: string
          kind?: string
          section_id?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "institution_channels_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_channels_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "institution_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_completion_counts: {
        Row: {
          completions: number
          publication_id: string
        }
        Insert: {
          completions?: number
          publication_id: string
        }
        Update: {
          completions?: number
          publication_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_completion_counts_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: true
            referencedRelation: "institution_publications"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_contact_profiles: {
        Row: {
          address: string
          circuit: string
          director_name: string
          facebook: string
          instagram: string
          institution_id: string
          phone: string
          regional_direction: string
          updated_at: string
          website: string
        }
        Insert: {
          address?: string
          circuit?: string
          director_name?: string
          facebook?: string
          instagram?: string
          institution_id: string
          phone?: string
          regional_direction?: string
          updated_at?: string
          website?: string
        }
        Update: {
          address?: string
          circuit?: string
          director_name?: string
          facebook?: string
          instagram?: string
          institution_id?: string
          phone?: string
          regional_direction?: string
          updated_at?: string
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_contact_profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: true
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_credentials: {
        Row: {
          active: boolean
          created_at: string
          created_by: string
          id: string
          identification: string
          institution_id: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by: string
          id?: string
          identification?: string
          institution_id: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string
          id?: string
          identification?: string
          institution_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_credentials_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_discounts: {
        Row: {
          active: boolean
          applies_to: string
          created_at: string
          criteria: string
          id: string
          institution_id: string
          kind: string
          name: string
          priority: number
          updated_at: string
          updated_by: string
          value: number
        }
        Insert: {
          active?: boolean
          applies_to?: string
          created_at?: string
          criteria?: string
          id?: string
          institution_id: string
          kind: string
          name: string
          priority: number
          updated_at?: string
          updated_by?: string
          value: number
        }
        Update: {
          active?: boolean
          applies_to?: string
          created_at?: string
          criteria?: string
          id?: string
          institution_id?: string
          kind?: string
          name?: string
          priority?: number
          updated_at?: string
          updated_by?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "institution_discounts_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_documents: {
        Row: {
          created_at: string
          created_by: string
          id: string
          institution_id: string
          path: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          institution_id: string
          path: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          institution_id?: string
          path?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_documents_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_family_notices: {
        Row: {
          attendance_id: string
          created_at: string
          guardian_id: string
          id: string
          institution_id: string
          student_id: string
        }
        Insert: {
          attendance_id: string
          created_at?: string
          guardian_id: string
          id?: string
          institution_id: string
          student_id: string
        }
        Update: {
          attendance_id?: string
          created_at?: string
          guardian_id?: string
          id?: string
          institution_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_family_notices_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "institution_attendance_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_family_notices_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_meal_coverage: {
        Row: {
          approved_by: string
          institution_id: string
          kind: string
          reason: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_by: string
          institution_id: string
          kind?: string
          reason?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_by?: string
          institution_id?: string
          kind?: string
          reason?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_meal_coverage_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_meal_deliveries: {
        Row: {
          coverage: string
          created_at: string
          id: string
          institution_id: string
          local_day: string
          recorded_by: string
          service: string
          user_id: string
        }
        Insert: {
          coverage: string
          created_at?: string
          id?: string
          institution_id: string
          local_day?: string
          recorded_by: string
          service: string
          user_id: string
        }
        Update: {
          coverage?: string
          created_at?: string
          id?: string
          institution_id?: string
          local_day?: string
          recorded_by?: string
          service?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_meal_deliveries_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_meal_settings: {
        Row: {
          institution_id: string
          sinpe_account: string
          student_price: number
          teacher_price: number
          universal_free: boolean
          updated_at: string
          updated_by: string
        }
        Insert: {
          institution_id: string
          sinpe_account?: string
          student_price?: number
          teacher_price?: number
          universal_free?: boolean
          updated_at?: string
          updated_by: string
        }
        Update: {
          institution_id?: string
          sinpe_account?: string
          student_price?: number
          teacher_price?: number
          universal_free?: boolean
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_meal_settings_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: true
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_members: {
        Row: {
          created_at: string
          institution_id: string
          member_role: Database["public"]["Enums"]["institution_role"]
          user_id: string
          verified_by: string
        }
        Insert: {
          created_at?: string
          institution_id: string
          member_role: Database["public"]["Enums"]["institution_role"]
          user_id: string
          verified_by: string
        }
        Update: {
          created_at?: string
          institution_id?: string
          member_role?: Database["public"]["Enums"]["institution_role"]
          user_id?: string
          verified_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_members_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_permission_events: {
        Row: {
          actor_id: string
          capability: string
          created_at: string
          enabled: boolean
          id: number
          institution_id: string
          previous_enabled: boolean | null
          user_id: string
        }
        Insert: {
          actor_id: string
          capability: string
          created_at?: string
          enabled: boolean
          id?: never
          institution_id: string
          previous_enabled?: boolean | null
          user_id: string
        }
        Update: {
          actor_id?: string
          capability?: string
          created_at?: string
          enabled?: boolean
          id?: never
          institution_id?: string
          previous_enabled?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      institution_practice_results: {
        Row: {
          correct: number
          created_at: string
          id: string
          institution_id: string
          publication_id: string
          publication_version: string
          question_count: number
          score: number
          subject: string
          title: string
          user_id: string
        }
        Insert: {
          correct: number
          created_at?: string
          id?: string
          institution_id: string
          publication_id: string
          publication_version: string
          question_count: number
          score: number
          subject: string
          title: string
          user_id: string
        }
        Update: {
          correct?: number
          created_at?: string
          id?: string
          institution_id?: string
          publication_id?: string
          publication_version?: string
          question_count?: number
          score?: number
          subject?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_practice_results_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_practice_results_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "institution_publications"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_publications: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          institution_id: string
          kind: string
          level: string
          minutes: number
          questions: Json
          status: string
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body?: string
          created_at?: string
          id?: string
          institution_id: string
          kind: string
          level?: string
          minutes?: number
          questions?: Json
          status?: string
          subject?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          institution_id?: string
          kind?: string
          level?: string
          minutes?: number
          questions?: Json
          status?: string
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_publications_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_resource_grants: {
        Row: {
          can_read: boolean
          can_send: boolean
          institution_id: string
          resource_id: string
        }
        Insert: {
          can_read?: boolean
          can_send?: boolean
          institution_id: string
          resource_id: string
        }
        Update: {
          can_read?: boolean
          can_send?: boolean
          institution_id?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_resource_grants_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "institution_resource_grants_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "institution_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_resources: {
        Row: {
          author_id: string
          content: Json
          created_at: string
          file_path: string | null
          id: string
          institution_id: string
          kind: string
          status: string
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          author_id: string
          content?: Json
          created_at?: string
          file_path?: string | null
          id?: string
          institution_id: string
          kind: string
          status?: string
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          author_id?: string
          content?: Json
          created_at?: string
          file_path?: string | null
          id?: string
          institution_id?: string
          kind?: string
          status?: string
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_resources_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_role_events: {
        Row: {
          actor_id: string
          created_at: string
          id: number
          institution_id: string
          new_role: string
          previous_role: string | null
          user_id: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: never
          institution_id: string
          new_role: string
          previous_role?: string | null
          user_id: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: never
          institution_id?: string
          new_role?: string
          previous_role?: string | null
          user_id?: string
        }
        Relationships: []
      }
      institution_schedules: {
        Row: {
          config: Json
          created_at: string
          created_by: string
          id: string
          institution_id: string
          result: Json
          title: string
          updated_at: string
        }
        Insert: {
          config: Json
          created_at?: string
          created_by: string
          id?: string
          institution_id: string
          result: Json
          title: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          created_by?: string
          id?: string
          institution_id?: string
          result?: Json
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_schedules_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_sections: {
        Row: {
          created_at: string
          created_by: string
          guide_id: string | null
          id: string
          institution_id: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by: string
          guide_id?: string | null
          id?: string
          institution_id: string
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          guide_id?: string | null
          id?: string
          institution_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_sections_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_service_events: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          details: Json
          id: number
          institution_id: string
          subject_id: string | null
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          details?: Json
          id?: never
          institution_id: string
          subject_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          details?: Json
          id?: never
          institution_id?: string
          subject_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "institution_service_events_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_service_operators: {
        Row: {
          institution_id: string
          service: string
          user_id: string
        }
        Insert: {
          institution_id: string
          service: string
          user_id: string
        }
        Update: {
          institution_id?: string
          service?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_service_operators_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_signed_documents: {
        Row: {
          body: string
          grades: Json
          holder: string
          id: string
          institution_id: string
          issued_at: string
          issued_by: string
          kind: string
          signer_name: string
          signer_role: string
          title: string
          verification_hash: string
          verification_payload: string
        }
        Insert: {
          body?: string
          grades?: Json
          holder?: string
          id?: string
          institution_id: string
          issued_at?: string
          issued_by: string
          kind: string
          signer_name: string
          signer_role: string
          title: string
          verification_hash: string
          verification_payload: string
        }
        Update: {
          body?: string
          grades?: Json
          holder?: string
          id?: string
          institution_id?: string
          issued_at?: string
          issued_by?: string
          kind?: string
          signer_name?: string
          signer_role?: string
          title?: string
          verification_hash?: string
          verification_payload?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_signed_documents_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_tariffs: {
        Row: {
          active: boolean
          amount: number
          created_at: string
          id: string
          institution_id: string
          label: string
          level: string | null
          license_category: string | null
          service: string
          updated_at: string
          updated_by: string
          vehicle: string | null
        }
        Insert: {
          active?: boolean
          amount: number
          created_at?: string
          id?: string
          institution_id: string
          label: string
          level?: string | null
          license_category?: string | null
          service: string
          updated_at?: string
          updated_by?: string
          vehicle?: string | null
        }
        Update: {
          active?: boolean
          amount?: number
          created_at?: string
          id?: string
          institution_id?: string
          label?: string
          level?: string | null
          license_category?: string | null
          service?: string
          updated_at?: string
          updated_by?: string
          vehicle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "institution_tariffs_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_ticket_purchases: {
        Row: {
          created_at: string
          created_by: string
          id: string
          institution_id: string
          method: string
          quantity: number
          reference: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          unit_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          institution_id: string
          method: string
          quantity: number
          reference?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status: string
          unit_price: number
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          institution_id?: string
          method?: string
          quantity?: number
          reference?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_ticket_purchases_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_user_permissions: {
        Row: {
          capability: string
          changed_at: string
          changed_by: string
          enabled: boolean
          institution_id: string
          user_id: string
        }
        Insert: {
          capability: string
          changed_at?: string
          changed_by?: string
          enabled: boolean
          institution_id: string
          user_id: string
        }
        Update: {
          capability?: string
          changed_at?: string
          changed_by?: string
          enabled?: boolean
          institution_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "institution_user_permissions_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institution_whatsapp_contacts: {
        Row: {
          consented_at: string
          id: string
          institution_id: string
          institutional_adult_confirmed: boolean
          label: string
          phone: string
          unsubscribed_at: string | null
        }
        Insert: {
          consented_at: string
          id?: string
          institution_id: string
          institutional_adult_confirmed: boolean
          label: string
          phone: string
          unsubscribed_at?: string | null
        }
        Update: {
          consented_at?: string
          id?: string
          institution_id?: string
          institutional_adult_confirmed?: boolean
          label?: string
          phone?: string
          unsubscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "institution_whatsapp_contacts_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_test: boolean
          kind: string
          logo_path: string | null
          name: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_test?: boolean
          kind?: string
          logo_path?: string | null
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_test?: boolean
          kind?: string
          logo_path?: string | null
          name?: string
        }
        Relationships: []
      }
      league_closures: {
        Row: {
          closed_at: string
          id: number
          manual: boolean
        }
        Insert: {
          closed_at?: string
          id?: never
          manual?: boolean
        }
        Update: {
          closed_at?: string
          id?: never
          manual?: boolean
        }
        Relationships: []
      }
      league_history: {
        Row: {
          closed_at: string
          from_tier: number
          id: number
          points: number
          rank: number
          to_tier: number
          user_id: string
        }
        Insert: {
          closed_at?: string
          from_tier: number
          id?: never
          points: number
          rank: number
          to_tier: number
          user_id: string
        }
        Update: {
          closed_at?: string
          from_tier?: number
          id?: never
          points?: number
          rank?: number
          to_tier?: number
          user_id?: string
        }
        Relationships: []
      }
      league_tiers: {
        Row: {
          chest: string | null
          chest_claimed: boolean
          tier: number
          user_id: string
          week_start: string
        }
        Insert: {
          chest?: string | null
          chest_claimed?: boolean
          tier?: number
          user_id: string
          week_start: string
        }
        Update: {
          chest?: string | null
          chest_claimed?: boolean
          tier?: number
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      mep_spec_indicators: {
        Row: {
          created_at: string
          id: string
          indicador: string
          materia: string
          modalidad: string
          nivel: string
          owner_id: string
          subarea: string
          tema: string
        }
        Insert: {
          created_at?: string
          id?: string
          indicador: string
          materia: string
          modalidad: string
          nivel: string
          owner_id?: string
          subarea?: string
          tema?: string
        }
        Update: {
          created_at?: string
          id?: string
          indicador?: string
          materia?: string
          modalidad?: string
          nivel?: string
          owner_id?: string
          subarea?: string
          tema?: string
        }
        Relationships: []
      }
      page_visits: {
        Row: {
          created_at: string
          id: number
          path: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          path: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          path?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          email: string | null
          expires_at: string
          id: string
          institution_id: string | null
          method: string
          payer_phone: string
          paypal_quote_id: string | null
          plan: string
          reference: string
          reviewed_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          email?: string | null
          expires_at?: string
          id?: string
          institution_id?: string | null
          method?: string
          payer_phone: string
          paypal_quote_id?: string | null
          plan: string
          reference: string
          reviewed_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string | null
          expires_at?: string
          id?: string
          institution_id?: string | null
          method?: string
          payer_phone?: string
          paypal_quote_id?: string | null
          plan?: string
          reference?: string
          reviewed_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_paypal_quote_id_fkey"
            columns: ["paypal_quote_id"]
            isOneToOne: false
            referencedRelation: "paypal_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      paypal_quotes: {
        Row: {
          crc_amount: number
          crc_per_usd: number
          created_at: string
          expires_at: string
          id: string
          order_id: string | null
          plan: string
          rate_date: string
          rate_source: string
          usd_amount: number
          user_id: string
        }
        Insert: {
          crc_amount: number
          crc_per_usd: number
          created_at?: string
          expires_at?: string
          id?: string
          order_id?: string | null
          plan: string
          rate_date: string
          rate_source: string
          usd_amount: number
          user_id: string
        }
        Update: {
          crc_amount?: number
          crc_per_usd?: number
          created_at?: string
          expires_at?: string
          id?: string
          order_id?: string | null
          plan?: string
          rate_date?: string
          rate_source?: string
          usd_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paypal_quotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_approvers: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      permission_edit_history: {
        Row: {
          actor_id: string
          created_at: string
          id: number
          new_values: Json
          previous_values: Json
          request_id: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: never
          new_values: Json
          previous_values: Json
          request_id: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: never
          new_values?: Json
          previous_values?: Json
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_edit_history_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "staff_permission_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_request_history: {
        Row: {
          changed_by: string | null
          created_at: string
          from_status: string | null
          id: number
          request_id: string
          to_status: string
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          from_status?: string | null
          id?: never
          request_id: string
          to_status: string
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          from_status?: string | null
          id?: never
          request_id?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_request_history_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "staff_permission_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_support_requests: {
        Row: {
          id: string
          note: string
          request_id: string
          requested_at: string
          responded_at: string | null
          response_path: string | null
          reviewer_id: string
        }
        Insert: {
          id?: string
          note: string
          request_id: string
          requested_at?: string
          responded_at?: string | null
          response_path?: string | null
          reviewer_id: string
        }
        Update: {
          id?: string
          note?: string
          request_id?: string
          requested_at?: string
          responded_at?: string | null
          response_path?: string | null
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_support_requests_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "staff_permission_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_attempts: {
        Row: {
          answers: Json
          assessment_mode: string
          certification_subject: string | null
          created_at: string
          deck_id: string
          earned_points: number
          id: string
          points_version: number
          question_count: number
          score: number
          title: string
          user_id: string
          verified_scoring: boolean
        }
        Insert: {
          answers?: Json
          assessment_mode?: string
          certification_subject?: string | null
          created_at?: string
          deck_id: string
          earned_points?: number
          id: string
          points_version?: number
          question_count: number
          score: number
          title: string
          user_id: string
          verified_scoring?: boolean
        }
        Update: {
          answers?: Json
          assessment_mode?: string
          certification_subject?: string | null
          created_at?: string
          deck_id?: string
          earned_points?: number
          id?: string
          points_version?: number
          question_count?: number
          score?: number
          title?: string
          user_id?: string
          verified_scoring?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "practice_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string
          daily_xp: number
          display_name: string
          goal: string
          id: string
          level: string
        }
        Insert: {
          avatar?: string
          daily_xp?: number
          display_name?: string
          goal?: string
          id: string
          level?: string
        }
        Update: {
          avatar?: string
          daily_xp?: number
          display_name?: string
          goal?: string
          id?: string
          level?: string
        }
        Relationships: []
      }
      recreational_sessions: {
        Row: {
          correct: number
          created_at: string
          id: string
          questions: number
          subject: string
          user_id: string
        }
        Insert: {
          correct: number
          created_at?: string
          id: string
          questions: number
          subject: string
          user_id: string
        }
        Update: {
          correct?: number
          created_at?: string
          id?: string
          questions?: number
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      section_students: {
        Row: {
          section_id: string
          student_id: string
        }
        Insert: {
          section_id: string
          student_id: string
        }
        Update: {
          section_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_students_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "institution_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_permission_requests: {
        Row: {
          attachment_path: string | null
          created_at: string
          ends_on: string
          hours: string | null
          id: string
          institution_id: string
          justification_note: string | null
          justification_path: string | null
          justification_reviewed_at: string | null
          justification_reviewer_id: string | null
          justification_status: string | null
          justified_at: string | null
          kind: string
          reason: string
          requester_id: string
          requester_role: Database["public"]["Enums"]["institution_role"] | null
          review_note: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          starts_on: string
          status: string
          urgent: boolean
          verification_hash: string | null
          verification_payload: string | null
        }
        Insert: {
          attachment_path?: string | null
          created_at?: string
          ends_on: string
          hours?: string | null
          id?: string
          institution_id: string
          justification_note?: string | null
          justification_path?: string | null
          justification_reviewed_at?: string | null
          justification_reviewer_id?: string | null
          justification_status?: string | null
          justified_at?: string | null
          kind: string
          reason: string
          requester_id: string
          requester_role?:
            | Database["public"]["Enums"]["institution_role"]
            | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          starts_on: string
          status?: string
          urgent?: boolean
          verification_hash?: string | null
          verification_payload?: string | null
        }
        Update: {
          attachment_path?: string | null
          created_at?: string
          ends_on?: string
          hours?: string | null
          id?: string
          institution_id?: string
          justification_note?: string | null
          justification_path?: string | null
          justification_reviewed_at?: string | null
          justification_reviewer_id?: string | null
          justification_status?: string | null
          justified_at?: string | null
          kind?: string
          reason?: string
          requester_id?: string
          requester_role?:
            | Database["public"]["Enums"]["institution_role"]
            | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          starts_on?: string
          status?: string
          urgent?: boolean
          verification_hash?: string | null
          verification_payload?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_permission_requests_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      student_exam_assignments: {
        Row: {
          created_at: string
          deck_id: string
          due_date: string | null
          id: string
          student_id: string
          teacher_id: string
          title: string
        }
        Insert: {
          created_at?: string
          deck_id: string
          due_date?: string | null
          id?: string
          student_id: string
          teacher_id: string
          title: string
        }
        Update: {
          created_at?: string
          deck_id?: string
          due_date?: string | null
          id?: string
          student_id?: string
          teacher_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_exam_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_exam_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_grades: {
        Row: {
          created_at: string
          id: string
          kind: string
          level: string
          score: number
          student_id: string
          subject: string
          teacher_id: string
          title: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          level?: string
          score: number
          student_id: string
          subject: string
          teacher_id?: string
          title: string
          weight?: number
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          level?: string
          score?: number
          student_id?: string
          subject?: string
          teacher_id?: string
          title?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_institution_visibility: {
        Row: {
          areas: string[]
          institution_id: string
          sections: string[]
          student_id: string
          topics: string[]
          updated_at: string
        }
        Insert: {
          areas?: string[]
          institution_id: string
          sections?: string[]
          student_id: string
          topics?: string[]
          updated_at?: string
        }
        Update: {
          areas?: string[]
          institution_id?: string
          sections?: string[]
          student_id?: string
          topics?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_institution_visibility_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      student_learning_records: {
        Row: {
          id: string
          level: string
          notes: string
          progress: number
          recorded_by: string
          student_id: string
          subject: string
          updated_at: string
        }
        Insert: {
          id?: string
          level: string
          notes?: string
          progress?: number
          recorded_by?: string
          student_id: string
          subject: string
          updated_at?: string
        }
        Update: {
          id?: string
          level?: string
          notes?: string
          progress?: number
          recorded_by?: string
          student_id?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_learning_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_pickup_authorizations: {
        Row: {
          created_at: string
          id: string
          identification: string
          name: string
          note: string
          relation: string
          request_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          identification: string
          name: string
          note?: string
          relation: string
          request_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          identification?: string
          name?: string
          note?: string
          relation?: string
          request_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_pickup_authorizations_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "enrollment_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      student_pickup_events: {
        Row: {
          actor_id: string
          authorization_id: string
          created_at: string
          id: number
          note: string
          status: string
        }
        Insert: {
          actor_id: string
          authorization_id: string
          created_at?: string
          id?: never
          note?: string
          status: string
        }
        Update: {
          actor_id?: string
          authorization_id?: string
          created_at?: string
          id?: never
          note?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_pickup_events_authorization_id_fkey"
            columns: ["authorization_id"]
            isOneToOne: false
            referencedRelation: "student_pickup_authorizations"
            referencedColumns: ["id"]
          },
        ]
      }
      student_record_documents: {
        Row: {
          category: string
          created_at: string
          created_by: string
          id: string
          institution_id: string
          path: string
          student_id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string
          id?: string
          institution_id: string
          path: string
          student_id: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          id?: string
          institution_id?: string
          path?: string
          student_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_record_documents_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      student_record_events: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          document_id: string
          id: number
          institution_id: string
          student_id: string
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          document_id: string
          id?: never
          institution_id: string
          student_id: string
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          document_id?: string
          id?: never
          institution_id?: string
          student_id?: string
        }
        Relationships: []
      }
      student_visibility_history: {
        Row: {
          actor_id: string
          after_value: Json
          before_value: Json | null
          created_at: string
          id: string
          institution_id: string
          student_id: string
        }
        Insert: {
          actor_id: string
          after_value: Json
          before_value?: Json | null
          created_at?: string
          id?: string
          institution_id: string
          student_id: string
        }
        Update: {
          actor_id?: string
          after_value?: Json
          before_value?: Json | null
          created_at?: string
          id?: string
          institution_id?: string
          student_id?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string
          email: string
          id: string
          institution: string
          level: string
          name: string
          notes: string
          status: string
          teacher_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          institution?: string
          level?: string
          name: string
          notes?: string
          status?: string
          teacher_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          institution?: string
          level?: string
          name?: string
          notes?: string
          status?: string
          teacher_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          id: string
          paddle_customer_id: string
          paddle_subscription_id: string
          price_id: string
          product_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          paddle_customer_id: string
          paddle_subscription_id: string
          price_id: string
          product_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          paddle_customer_id?: string
          paddle_subscription_id?: string
          price_id?: string
          product_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_cases: {
        Row: {
          created_at: string
          created_by: string
          id: string
          kind: string
          notes: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          kind?: string
          notes?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          kind?: string
          notes?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      teacher_access: {
        Row: {
          created_at: string
          created_by: string
          email: string
        }
        Insert: {
          created_at?: string
          created_by: string
          email: string
        }
        Update: {
          created_at?: string
          created_by?: string
          email?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_access_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_exams: {
        Row: {
          created_at: string
          id: string
          minutes: number
          published: boolean
          questions: Json
          teacher_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          minutes?: number
          published?: boolean
          questions?: Json
          teacher_id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          minutes?: number
          published?: boolean
          questions?: Json
          teacher_id?: string
          title?: string
        }
        Relationships: []
      }
      teacher_group_members: {
        Row: {
          group_id: string
          student_id: string
        }
        Insert: {
          group_id: string
          student_id: string
        }
        Update: {
          group_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "teacher_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_group_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_groups: {
        Row: {
          created_at: string
          id: string
          name: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_groups_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_guardian_consent: {
        Args: { _inst: string; _version: string }
        Returns: number
      }
      additional_institution_reports: { Args: { _inst: string }; Returns: Json }
      admin_card_revenue: {
        Args: never
        Returns: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string
          email: string
          price_id: string
          product_id: string
          status: string
          user_id: string
        }[]
      }
      admin_correct_account_role: {
        Args: { _role: string; _user: string }
        Returns: undefined
      }
      admin_create_institution: {
        Args: { _is_test: boolean; _kind: string; _name: string }
        Returns: string
      }
      admin_institution_members: {
        Args: { _inst: string }
        Returns: {
          created_at: string
          display_name: string
          email: string
          member_role: Database["public"]["Enums"]["institution_role"]
          user_id: string
        }[]
      }
      admin_institutions: {
        Args: never
        Returns: {
          created_at: string
          id: string
          is_test: boolean
          kind: string
          logo_path: string
          name: string
          paid_until: string
          staff: number
          students: number
        }[]
      }
      admin_remove_institution_member: {
        Args: { _inst: string; _user: string }
        Returns: undefined
      }
      admin_set_institution_logo: {
        Args: { _inst: string; _path: string }
        Returns: undefined
      }
      admin_set_institution_member: {
        Args: {
          _email: string
          _inst: string
          _role: Database["public"]["Enums"]["institution_role"]
        }
        Returns: string
      }
      admin_user_overview: {
        Args: never
        Returns: {
          attempts: number
          avg_score: number
          created_at: string
          display_name: string
          email: string
          last_sign_in: string
          paid_plan: string
          paid_until: string
          status: string
          user_id: string
          xp: number
        }[]
      }
      admin_user_trace: { Args: { _environment?: string }; Returns: Json }
      announcement_delivery: {
        Args: { _inst: string }
        Returns: {
          announcement_id: string
          staff_reads: number
          staff_recipients: number
          student_reads: number
          student_recipients: number
        }[]
      }
      assign_additional_institution_role: {
        Args: {
          _email: string
          _inst: string
          _reports: boolean
          _role: string
          _specialty: string
        }
        Returns: undefined
      }
      assign_student_section: {
        Args: { _section: string; _student: string }
        Returns: undefined
      }
      attach_permission_justification: {
        Args: { _id: string; _path: string }
        Returns: string
      }
      can_edit_institution_publication: {
        Args: { _inst: string }
        Returns: boolean
      }
      can_follow_student: {
        Args: { _inst: string; _student: string }
        Returns: boolean
      }
      can_manage_sections: { Args: { _inst: string }; Returns: boolean }
      can_manage_student_records: { Args: { _inst: string }; Returns: boolean }
      can_read_institution_resource: { Args: { _id: string }; Returns: boolean }
      can_review_any_permissions: { Args: never; Returns: boolean }
      can_review_channel_attachment: { Args: { _ch: string }; Returns: boolean }
      can_review_enrollment: { Args: { _inst: string }; Returns: boolean }
      can_review_permissions: { Args: { _inst: string }; Returns: boolean }
      can_send_institution_resource: {
        Args: { _id: string; _sender: string }
        Returns: boolean
      }
      can_use_teacher_tools: { Args: never; Returns: boolean }
      cancel_permission_request: { Args: { _id: string }; Returns: undefined }
      channel_access: { Args: { _ch: string }; Returns: string }
      channel_access_path: { Args: { _name: string }; Returns: string }
      channel_feed: {
        Args: { _ch: string }
        Returns: {
          attachment_name: string
          attachment_path: string
          attachment_status: string
          body: string
          can_review: boolean
          created_at: string
          hidden: boolean
          id: string
          is_guide: boolean
          sender_id: string
          sender_name: string
          sender_role: string
        }[]
      }
      channel_file_readable: { Args: { _name: string }; Returns: boolean }
      claim_student_registration: { Args: never; Returns: undefined }
      consume_assistant_question: { Args: never; Returns: number }
      count_institution_completion: { Args: never; Returns: undefined }
      create_access_code: {
        Args: { _code: string; _days: number; _max_uses: number }
        Returns: string
      }
      edit_pending_permission: {
        Args: {
          _ends_on: string
          _hours: string
          _id: string
          _reason: string
          _starts_on: string
          _urgent: boolean
        }
        Returns: undefined
      }
      enrollment_institutions: {
        Args: never
        Returns: {
          id: string
          is_test: boolean
          kind: string
          name: string
        }[]
      }
      export_institution_backup: { Args: { _inst: string }; Returns: Json }
      grade_teacher_exam: {
        Args: { _exam: string; _picks: number[] }
        Returns: {
          answers: number[]
          correct: number
          total: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hide_channel_message: { Args: { _id: string }; Returns: undefined }
      institution_analytics: { Args: never; Returns: Json }
      institution_capability_allowed: {
        Args: { _cap: string; _inst: string }
        Returns: boolean
      }
      institution_paid_until: { Args: { _inst: string }; Returns: string }
      institution_people: {
        Args: { _inst: string }
        Returns: {
          display_name: string
          email: string
          guardians: number
          member_role: Database["public"]["Enums"]["institution_role"]
          section_id: string
          section_name: string
          user_id: string
        }[]
      }
      institution_role_history: {
        Args: { _inst: string }
        Returns: {
          actor_email: string
          created_at: string
          new_role: string
          person_email: string
          previous_role: string
        }[]
      }
      institution_role_of: {
        Args: { _inst: string }
        Returns: Database["public"]["Enums"]["institution_role"]
      }
      institution_topic_visible: {
        Args: { _inst: string; _subject: string; _topic: string }
        Returns: boolean
      }
      is_institution_staff: { Args: { _inst: string }; Returns: boolean }
      is_permission_approver: { Args: never; Returns: boolean }
      is_section_guide_of: {
        Args: { _inst: string; _student: string }
        Returns: boolean
      }
      issue_certificate: { Args: { _attempt: string }; Returns: string }
      issue_institution_document: {
        Args: {
          _body: string
          _grades: Json
          _holder: string
          _inst: string
          _kind: string
          _title: string
        }
        Returns: string
      }
      lead_institution_members: {
        Args: { _inst: string }
        Returns: {
          display_name: string
          email: string
          member_role: Database["public"]["Enums"]["institution_role"]
          user_id: string
        }[]
      }
      lead_set_institution_member: {
        Args: {
          _email: string
          _inst: string
          _role: Database["public"]["Enums"]["institution_role"]
        }
        Returns: string
      }
      lead_set_institution_permission: {
        Args: { _cap: string; _enabled: boolean; _inst: string; _user: string }
        Returns: undefined
      }
      league_apply: {
        Args: { _from: string; _source: string; _target: string; _to: string }
        Returns: undefined
      }
      league_claim_chest: { Args: never; Returns: string }
      league_close_now: { Args: never; Returns: undefined }
      league_settle: { Args: never; Returns: undefined }
      league_standings: {
        Args: never
        Returns: {
          avatar: string
          chest: string
          chest_claimed: boolean
          is_me: boolean
          my_tier: number
          name: string
          points: number
        }[]
      }
      league_week_start: { Args: { _ts: string }; Returns: string }
      league_window_start: { Args: never; Returns: string }
      link_guardian: {
        Args: {
          _email: string
          _inst: string
          _relation: string
          _student: string
        }
        Returns: string
      }
      load_institution_practice: { Args: { _id: string }; Returns: Json }
      manages_institution_resource: {
        Args: { _inst: string }
        Returns: boolean
      }
      my_access: {
        Args: never
        Returns: {
          has_access: boolean
          paid_until: string
          status: string
          trial_ends: string
        }[]
      }
      my_channels: {
        Args: { _inst: string }
        Returns: {
          channel_id: string
          kind: string
          last_at: string
          section_id: string
          student_id: string
          title: string
          unread: number
        }[]
      }
      my_guardian_links: {
        Args: { _inst: string }
        Returns: {
          consented_at: string
          relation: string
          student_id: string
          student_name: string
        }[]
      }
      my_institutions: {
        Args: never
        Returns: {
          id: string
          is_test: boolean
          kind: string
          logo_path: string
          member_role: Database["public"]["Enums"]["institution_role"]
          name: string
          paid_until: string
        }[]
      }
      my_recreation_rank: {
        Args: { _days?: number }
        Returns: {
          games: number
          players: number
          points: number
          rank: number
        }[]
      }
      my_teacher_exams: {
        Args: never
        Returns: {
          id: string
          minutes: number
          questions: Json
          title: string
        }[]
      }
      open_channel: {
        Args: {
          _inst: string
          _kind: string
          _section: string
          _student: string
        }
        Returns: string
      }
      paid_through: { Args: { _user: string }; Returns: string }
      payment_period_end: {
        Args: { _inst: string; _plan: string; _user: string }
        Returns: string
      }
      permission_justification_states: {
        Args: never
        Returns: {
          id: string
          justification_note: string
          justification_reviewed_at: string
          justification_status: string
        }[]
      }
      permission_requests_for_review: {
        Args: never
        Returns: {
          attachment_path: string
          created_at: string
          ends_on: string
          hours: string
          id: string
          institution_name: string
          justification_path: string
          justified_at: string
          kind: string
          reason: string
          requester_email: string
          requester_name: string
          requester_role: Database["public"]["Enums"]["institution_role"]
          review_note: string
          reviewed_at: string
          starts_on: string
          status: string
          urgent: boolean
          verification_hash: string
        }[]
      }
      price_enrollment: {
        Args: { _discounts: string[]; _id: string; _tariff: string }
        Returns: {
          base_amount: number
          discount_amount: number
          discount_id: string | null
          discount_name: string | null
          discount_priority: number | null
          final_amount: number
          id: string
          institution_id: string
          priced_at: string
          priced_by: string
          request_id: string
          tariff_id: string
          tariff_label: string
        }
        SetofOptions: {
          from: "*"
          to: "enrollment_pricing"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      public_institution_catalog: {
        Args: never
        Returns: {
          body: string
          id: string
          institution_id: string
          institution_name: string
          kind: string
          level: string
          logo_path: string
          minutes: number
          question_count: number
          subject: string
          title: string
        }[]
      }
      public_institution_directory: {
        Args: never
        Returns: {
          id: string
          kind: string
          logo_path: string
          name: string
        }[]
      }
      public_institution_resources: {
        Args: never
        Returns: {
          content: Json
          file_path: string
          id: string
          institution_id: string
          institution_name: string
          kind: string
          logo_path: string
          title: string
        }[]
      }
      recreation_ranking: {
        Args: { _days?: number }
        Returns: {
          avatar: string
          games: number
          is_me: boolean
          player: string
          points: number
          rank: number
        }[]
      }
      redeem_access_code: { Args: { _code: string }; Returns: string }
      remove_student_section: {
        Args: { _section: string; _student: string }
        Returns: undefined
      }
      request_permission_support: {
        Args: { _id: string; _note: string }
        Returns: string
      }
      resource_permission_institutions: {
        Args: never
        Returns: {
          id: string
          name: string
        }[]
      }
      respond_permission_support: {
        Args: { _id: string; _path: string }
        Returns: undefined
      }
      review_channel_attachment: {
        Args: { _approve: boolean; _id: string }
        Returns: undefined
      }
      review_enrollment: {
        Args: { _approve: boolean; _id: string; _note: string }
        Returns: string
      }
      review_institution_area: {
        Args: {
          _approved: boolean
          _inst: string
          _reason: string
          _subject: string
        }
        Returns: undefined
      }
      review_permission_justification: {
        Args: { _decision: string; _id: string; _note: string }
        Returns: undefined
      }
      review_permission_request: {
        Args: { _decision: string; _id: string; _note: string }
        Returns: undefined
      }
      review_pickup_authorization: {
        Args: { _id: string; _note: string; _status: string }
        Returns: undefined
      }
      save_section: {
        Args: { _guide: string; _id: string; _inst: string; _name: string }
        Returns: string
      }
      school_attendance_operator: {
        Args: { _session: string }
        Returns: boolean
      }
      school_family_can_read: {
        Args: { _inst: string; _user: string }
        Returns: boolean
      }
      school_service_action: {
        Args: { _action: string; _data?: Json; _inst: string }
        Returns: Json
      }
      school_service_manager: { Args: { _inst: string }; Returns: boolean }
      school_service_operator: {
        Args: { _inst: string; _service: string }
        Returns: boolean
      }
      score_institution_practice: {
        Args: { _id: string; _picks: number[]; _version: string }
        Returns: Json
      }
      set_institution_logo: {
        Args: { _inst: string; _path: string }
        Returns: undefined
      }
      set_student_visibility: {
        Args: {
          _areas: string[]
          _inst: string
          _sections: string[]
          _student: string
          _topics: string[]
        }
        Returns: undefined
      }
      student_discount_eligible: { Args: { _inst: string }; Returns: boolean }
      student_follow_up: {
        Args: { _inst: string; _student: string }
        Returns: Json
      }
      student_guardians: {
        Args: { _inst: string; _student: string }
        Returns: {
          display_name: string
          email: string
          guardian_id: string
          relation: string
        }[]
      }
      student_record_path_allowed: { Args: { _path: string }; Returns: boolean }
      student_record_people: {
        Args: { _inst: string }
        Returns: {
          display_name: string
          user_id: string
        }[]
      }
      student_visible_schedules: {
        Args: { _inst: string; _student: string }
        Returns: Json
      }
      teacher_badges: {
        Args: never
        Returns: {
          hash: string
          issued_at: string
          revoked: boolean
          score: number
          student_name: string
          title: string
        }[]
      }
      teacher_student_plans: {
        Args: never
        Returns: {
          has_access: boolean
          paid_until: string
          student_id: string
          trial_ends: string
        }[]
      }
      unlink_guardian: {
        Args: { _guardian: string; _inst: string; _student: string }
        Returns: undefined
      }
      verify_certificate: {
        Args: { _hash: string }
        Returns: {
          holder: string
          issued_at: string
          score: number
          title: string
        }[]
      }
      verify_enrollment: {
        Args: { _hash: string }
        Returns: {
          institution_name: string
          is_mine: boolean
          level: string
          reviewed_at: string
          valid: boolean
        }[]
      }
      verify_institution_document: {
        Args: { _hash: string }
        Returns: {
          institution_name: string
          issued_at: string
          kind: string
          valid: boolean
        }[]
      }
      verify_permission: {
        Args: { _hash: string }
        Returns: {
          ends_on: string
          holder: string
          hours: string
          institution_name: string
          kind: string
          reviewed_at: string
          starts_on: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student"
      institution_role:
        | "direccion"
        | "docente"
        | "administrativo"
        | "estudiante"
        | "encargado"
        | "subdireccion"
        | "asistente"
        | "auxiliar"
        | "orientacion"
        | "secretaria"
        | "apoyo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "student"],
      institution_role: [
        "direccion",
        "docente",
        "administrativo",
        "estudiante",
        "encargado",
        "subdireccion",
        "asistente",
        "auxiliar",
        "orientacion",
        "secretaria",
        "apoyo",
      ],
    },
  },
} as const
