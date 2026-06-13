import { createClient } from "./client";
import type {
  BoardCard,
  TextAnnotation,
} from "@/components/CanvasBoard/types/Card";

export interface BoardProject {
  id: string;
  user_id: string;
  tool: string;
  title: string;
  board_cards: BoardCard[];
  text_annotations: TextAnnotation[];
  brainstorm_notes: string;
  created_at: string;
  updated_at: string;
}

export interface BoardProjectSummary {
  id: string;
  title: string;
  updated_at: string;
}

export interface SaveProjectInput {
  id?: string;
  tool: string;
  title: string;
  boardCards: BoardCard[];
  textAnnotations: TextAnnotation[];
  brainstormNotes: string;
}

export async function saveProject(
  input: SaveProjectInput
): Promise<BoardProject> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Not signed in");

  const row = {
    ...(input.id ? { id: input.id } : {}),
    user_id: userId,
    tool: input.tool,
    title: input.title,
    board_cards: input.boardCards,
    text_annotations: input.textAnnotations,
    brainstorm_notes: input.brainstormNotes,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("board_projects")
    .upsert(row)
    .select()
    .single();

  if (error) throw error;
  return data as BoardProject;
}

export async function listProjects(
  tool: string
): Promise<BoardProjectSummary[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("board_projects")
    .select("id,title,updated_at")
    .eq("tool", tool)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as BoardProjectSummary[];
}

export async function loadProject(id: string): Promise<BoardProject> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("board_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as BoardProject;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("board_projects").delete().eq("id", id);
  if (error) throw error;
}
