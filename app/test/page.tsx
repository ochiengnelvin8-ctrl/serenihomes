import { supabase } from '@/lib/supabase'

export default async function TestPage() {

  const { data, error } = await supabase
    .from('users')
    .select('*')

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Supabase Test
      </h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

      {error && (
        <p>{error.message}</p>
      )}
    </div>
  )
}