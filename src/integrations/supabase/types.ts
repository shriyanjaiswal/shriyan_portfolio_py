export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          date: string
          id: string
          link: string | null
          name: string
          organization: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          link?: string | null
          name: string
          organization: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          link?: string | null
          name?: string
          organization?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      journey_timeline: {
        Row: {
          color: string | null
          created_at: string
          description: string
          highlights: string[] | null
          icon: string | null
          id: string
          period: string
          phase: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description: string
          highlights?: string[] | null
          icon?: string | null
          id?: string
          period: string
          phase: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string
          highlights?: string[] | null
          icon?: string | null
          id?: string
          period?: string
          phase?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      personal_info: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          github_url: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          location: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          quote: string | null
          resume_url: string | null
          role: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          quote?: string | null
          resume_url?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          quote?: string | null
          resume_url?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description: string
          end_date: string | null
          features: string[] | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          live_demo_url: string | null
          name: string
          short_description: string | null
          sort_order: number | null
          source_code_url: string | null
          start_date: string | null
          stats: Json | null
          technologies: string[] | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          end_date?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          live_demo_url?: string | null
          name: string
          short_description?: string | null
          sort_order?: number | null
          source_code_url?: string | null
          start_date?: string | null
          stats?: Json | null
          technologies?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          end_date?: string | null
          features?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          live_demo_url?: string | null
          name?: string
          short_description?: string | null
          sort_order?: number | null
          source_code_url?: string | null
          start_date?: string | null
          stats?: Json | null
          technologies?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string | null
          id: string
          name: string
          proficiency: number
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          name: string
          proficiency: number
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          name?: string
          proficiency?: number
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
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
    Enums: {},
  },
} as const
