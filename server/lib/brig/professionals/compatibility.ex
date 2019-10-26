defmodule Brig.Professionals.Compatibility do
  alias Brig.Professionals

  @distance_threshold 80467.2

  def get_compatible_pros(options) do
    Professionals.list()
    |> Enum.filter(fn pro -> within_threshold_distance(options, pro) end)
    |> Enum.sort_by(fn pro ->
      IO.puts "Compatibility with: #{pro.name}"
      IO.inspect(calc_compatibility_score(options, pro))
    end, &>=/2)
  end

  defp calc_compatibility_score(client, pro) do
    calc_specialties(client, pro) +
    calc_age(client, pro) +
    calc_is_religious(client, pro) +
    calc_is_spiritual(client, pro) +
    calc_political(client, pro)
  end

  defp within_threshold_distance(%{"latitude" => client_lat, "longitude" => client_lon},
                                %{latitude: pro_lat, longitude: pro_lon}) do
    { client_lon_float, _ } = Float.parse(client_lon)
    { client_lat_float, _ } = Float.parse(client_lat)
    dist = Distance.GreatCircle.distance(
      { client_lon_float, client_lat_float },
      {Decimal.to_float(pro_lon), Decimal.to_float(pro_lat)}
    )

    dist <= @distance_threshold
  end

  defp calc_specialties(%{"reasonForSeekingHelp" => reason}, %{specialties: specialties}) do
    if Enum.member?(specialties, reason) do 50 else 0 end
  end

  defp calc_age(%{"age" => client_age}, %{age: pro_age}) do
    30 - abs(pro_age - client_age)
  end

  defp calc_is_religious(%{"isReligious" => client_is_religious}, %{is_religious: pro_is_religious}) do
    if client_is_religious == pro_is_religious do 20 else 0 end
  end

  defp calc_is_spiritual(%{"isSpiritual" => client_is_spiritual}, %{is_spiritual: pro_is_spiritual}) do
    if client_is_spiritual == pro_is_spiritual do 20 else 0 end
  end

  defp calc_political(%{"politicalAlignment" => client_political_alignment}, %{political_alignment: pro_political_alignment}) do
    cond do
      client_political_alignment == pro_political_alignment -> 30
      client_political_alignment == "Moderate" || pro_political_alignment == "Moderate" -> 15
      true -> 0
    end
  end

end
