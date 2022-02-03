import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from '../../services/supabase'

export default function AuthCookieHandler(req:NextApiRequest, res:NextApiResponse) {
  supabaseClient.auth.api.setAuthCookie(req, res)
}
