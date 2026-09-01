import { NextResponse } from "next/server";

const web3formsAccessKey =
  process.env.WEB3FORMS_ACCESS_KEY ??
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "";

type BookingRequest = {
  firstName?: string;
  address?: string;
  province?: string;
  phone?: string;
  email?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  packageName?: string;
  addons?: string;
  total?: string;
  botcheck?: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as BookingRequest;

    if (data.botcheck) {
      return NextResponse.json({ ok: true });
    }

    if (
      !data.firstName ||
      !data.address ||
      !data.phone ||
      !data.email ||
      !data.preferredDate ||
      !data.preferredTime
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!web3formsAccessKey) {
      console.error("[WEB3FORMS_CONFIG_MISSING]", {
        hasServerKey: Boolean(process.env.WEB3FORMS_ACCESS_KEY),
        hasPublicFallback: Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY),
      });
      return NextResponse.json(
        { ok: false, error: "Booking email is not configured", code: "missing_access_key" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsAccessKey,
        botcheck: "",
        subject: `New Booking - ${data.firstName} (${data.total ?? "Quote"})`,
        from_name: "TrueNorth Duct Cleaning Website",
        first_name: data.firstName,
        address: data.address,
        province: data.province,
        phone: data.phone,
        email: data.email,
        customer_message: data.message || "None",
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        package: data.packageName,
        addons: data.addons || "None",
        total: data.total,
        source: "quote-calculator",
      }),
    });

    const result = await res.json().catch(() => ({ success: false }));

    if (!res.ok || !result.success) {
      console.error("[WEB3FORMS_ERROR]", {
        status: res.status,
        message: result.message ?? "Unknown Web3Forms error",
      });
      return NextResponse.json(
        { ok: false, error: "Booking email could not be sent", code: "web3forms_rejected" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[LEAD_ROUTE_ERROR]", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request", code: "invalid_request" },
      { status: 400 }
    );
  }
}
