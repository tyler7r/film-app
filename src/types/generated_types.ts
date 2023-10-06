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
      games: {
        Row: {
          id: string
          season: string | null
          team1_id: string
          team2_id: string
          tournament: string | null
          url: string | null
        }
        Insert: {
          id: string
          season?: string | null
          team1_id: string
          team2_id: string
          tournament?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          season?: string | null
          team1_id?: string
          team2_id?: string
          tournament?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_team1_id_fkey"
            columns: ["team1_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_team2_id_fkey"
            columns: ["team2_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      plays: {
        Row: {
          author: string
          game: string
          id: string
          keywords: string[] | null
          note: string | null
          timestamp: string
        }
        Insert: {
          author: string
          game: string
          id: string
          keywords?: string[] | null
          note?: string | null
          timestamp: string
        }
        Update: {
          author?: string
          game?: string
          id?: string
          keywords?: string[] | null
          note?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "plays_author_fkey"
            columns: ["author"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plays_game_fkey"
            columns: ["game"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          affiliation_pwd: string | null
          announcements: string[] | null
          city: string | null
          division: string | null
          id: string
          name: string | null
          next_opp: string | null
        }
        Insert: {
          affiliation_pwd?: string | null
          announcements?: string[] | null
          city?: string | null
          division?: string | null
          id: string
          name?: string | null
          next_opp?: string | null
        }
        Update: {
          affiliation_pwd?: string | null
          announcements?: string[] | null
          city?: string | null
          division?: string | null
          id?: string
          name?: string | null
          next_opp?: string | null
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
