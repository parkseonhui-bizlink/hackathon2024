import { redirect } from 'next/navigation';

// projectにリダイレクトさせる
export default function Project() {
  return redirect('/projectList');
}
