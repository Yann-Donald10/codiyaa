import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import LeftNavBar from "../components/LeftNavBar";

export default function Work() {
  
  return (
    <div>
      <LeftNavBar/>
    </div>
  );
}