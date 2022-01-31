import { createClient, SupabaseClient, SupabaseRealtimePayload } from '@supabase/supabase-js'

type Message = {
  id: number;
  created_at: string;
  from: string;
  content: string;
}

type Messages = Array<Message>

type SubscribeForChangesProps = {
  table: string;
  action: '*' | 'INSERT' | 'UPDATE' | 'DELETE';
  callbackForChanges: (payload:SupabaseRealtimePayload<any>) => void;
}

export async function getAllMessages(supabaseClient:SupabaseClient) {
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

export function subscribeForChanges(supabaseClient:SupabaseClient, { table, action, callbackForChanges }:SubscribeForChangesProps) {
  const subscription = supabaseClient
    .from(table)
    .on(action, payload => callbackForChanges(payload))
    .subscribe()

  return subscription
}
