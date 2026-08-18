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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      content_post_media: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          media_type: string
          media_url: string
          post_id: string
          sort_order: number
          thumbnail_url: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          media_type?: string
          media_url: string
          post_id: string
          sort_order?: number
          thumbnail_url?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          media_type?: string
          media_url?: string
          post_id?: string
          sort_order?: number
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "content_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      content_posts: {
        Row: {
          category_id: string | null
          client_name: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          external_url: string | null
          id: string
          is_featured: boolean
          post_type: string
          published_at: string | null
          services: string[]
          slug: string
          sort_order: number
          status: string
          title: string
          updated_at: string
          video_url: string | null
          youtube_url: string | null
          youtube_video_id: string | null
        }
        Insert: {
          category_id?: string | null
          client_name?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          external_url?: string | null
          id?: string
          is_featured?: boolean
          post_type?: string
          published_at?: string | null
          services?: string[]
          slug: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          video_url?: string | null
          youtube_url?: string | null
          youtube_video_id?: string | null
        }
        Update: {
          category_id?: string | null
          client_name?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          external_url?: string | null
          id?: string
          is_featured?: boolean
          post_type?: string
          published_at?: string | null
          services?: string[]
          slug?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          video_url?: string | null
          youtube_url?: string | null
          youtube_video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          admin_notes: string | null
          consent_given: boolean
          cover_message: string
          created_at: string
          current_location: string | null
          cv_file_name: string
          cv_file_path: string
          email: string
          full_name: string
          id: string
          linkedin_profile: string | null
          phone: string
          portfolio_website: string | null
          position: string
          status: string
          updated_at: string
          vacancy_id: string | null
          years_of_experience: string | null
        }
        Insert: {
          admin_notes?: string | null
          consent_given?: boolean
          cover_message: string
          created_at?: string
          current_location?: string | null
          cv_file_name: string
          cv_file_path: string
          email: string
          full_name: string
          id?: string
          linkedin_profile?: string | null
          phone: string
          portfolio_website?: string | null
          position: string
          status?: string
          updated_at?: string
          vacancy_id?: string | null
          years_of_experience?: string | null
        }
        Update: {
          admin_notes?: string | null
          consent_given?: boolean
          cover_message?: string
          created_at?: string
          current_location?: string | null
          cv_file_name?: string
          cv_file_path?: string
          email?: string
          full_name?: string
          id?: string
          linkedin_profile?: string | null
          phone?: string
          portfolio_website?: string | null
          position?: string
          status?: string
          updated_at?: string
          vacancy_id?: string | null
          years_of_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_vacancy_id_fkey"
            columns: ["vacancy_id"]
            isOneToOne: false
            referencedRelation: "vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          media_type: string
          media_url: string
          sort_order: number
          storage_path: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          media_type?: string
          media_url: string
          sort_order?: number
          storage_path?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          media_type?: string
          media_url?: string
          sort_order?: number
          storage_path?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      pricing_feature_values: {
        Row: {
          created_at: string
          display_value: string | null
          feature_id: string | null
          id: string
          included: boolean | null
          package_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_value?: string | null
          feature_id?: string | null
          id?: string
          included?: boolean | null
          package_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_value?: string | null
          feature_id?: string | null
          id?: string
          included?: boolean | null
          package_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_feature_values_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "pricing_features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_feature_values_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "pricing_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_features: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pricing_features_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "pricing_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_packages: {
        Row: {
          badge: string | null
          billing_period: string
          created_at: string
          description: string | null
          features: string[]
          id: string
          is_active: boolean
          is_popular: boolean
          name: string
          price_lkr: number
          slug: string
          sort_order: number
          tier: string
          updated_at: string
        }
        Insert: {
          badge?: string | null
          billing_period?: string
          created_at?: string
          description?: string | null
          features?: string[]
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name: string
          price_lkr: number
          slug: string
          sort_order?: number
          tier: string
          updated_at?: string
        }
        Update: {
          badge?: string | null
          billing_period?: string
          created_at?: string
          description?: string | null
          features?: string[]
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name?: string
          price_lkr?: number
          slug?: string
          sort_order?: number
          tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean
          comment: string | null
          created_at: string
          id: string
          rating: number
          reviewer_name: string
        }
        Insert: {
          approved?: boolean
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewer_name: string
        }
        Update: {
          approved?: boolean
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewer_name?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          name: string
          position: string
          social_links: Json
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          position: string
          social_links?: Json
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          position?: string
          social_links?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vacancies: {
        Row: {
          application_deadline: string | null
          benefits: string[]
          created_at: string
          department: string | null
          description: string | null
          employment_type: string | null
          experience_required: string | null
          id: string
          is_active: boolean
          location: string | null
          requirements: string[]
          responsibilities: string[]
          short_description: string | null
          slug: string
          sort_order: number
          status: string
          title: string
          updated_at: string
          work_mode: string | null
        }
        Insert: {
          application_deadline?: string | null
          benefits?: string[]
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          experience_required?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          requirements?: string[]
          responsibilities?: string[]
          short_description?: string | null
          slug: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          work_mode?: string | null
        }
        Update: {
          application_deadline?: string | null
          benefits?: string[]
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          experience_required?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          requirements?: string[]
          responsibilities?: string[]
          short_description?: string | null
          slug?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          work_mode?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
