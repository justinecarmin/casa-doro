exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const supabaseUrl = 'https://dxsfsufzyzrtgbschupl.supabase.co/rest/v1/rpc/decrement_places';
    const anonKey = 'sb_publishable_cI3X3irU7lQkuRZbT_EkLA_TKlzfWat';

    const response = await fetch(supabaseUrl, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event_slug: 'sound-bath-aout-2026' })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { statusCode: 500, body: `Error updating Supabase: ${errorText}` };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Places decremented successfully' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
