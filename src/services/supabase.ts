import { createClient, SupabaseRealtimePayload } from '@supabase/supabase-js'

type Message = {
  id?: number;
  created_at?: string;
  from: string;
  content: string;
}

type Messages = Array<Message>

type SubscribeForChangesProps = {
  table: string;
  action: '*' | 'INSERT' | 'UPDATE' | 'DELETE';
  callbackForChanges: (payload:SupabaseRealtimePayload<any>) => void;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : ''

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function getAllMessages() {
  let messages: Messages = []

  try {
    const response = await supabaseClient
      .from('messages')
      .select()

    if(response.error) {
      throw new Error
    }

    if(response.data) {
      messages = response.data
    }
  } catch(error) {
    alert('Algo deu errado. Por favor, tente novamente mais tarde.')
  } finally {
    return messages
  }
}

export function subscribeForChanges({ table, action, callbackForChanges }:SubscribeForChangesProps) {
  const subscription = supabaseClient
    .from(table)
    .on(action, payload => callbackForChanges(payload))
    .subscribe()

  return subscription
}

export async function signOut() {
  try {
    const { error } = await supabaseClient.auth.signOut()

    if(error) {
      throw new Error
    }
  } catch(error) {
    alert('Algo deu errado. Por favor, tente novamente.')
  }
}
