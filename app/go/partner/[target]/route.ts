import { NextResponse } from "next/server";

const destinations: Record<string, string> = {
  rovbet: "https://cpagetti.com/offer/view/15461?utm_source=tur1",
  crosspromo:
    "https://cpagetti.com/?utm_source=crosspromo&utm_medium=proxyluxe",
  tgpost:
    "https://cpagetti.com/?utm_source=tgpost&utm_medium=crosspromo&utm_campaign=proxyluxe",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ target: string }> }
) {
  const { target } = await params;
  const destination = destinations[target];

  if (!destination) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.redirect(destination, 307);
}
