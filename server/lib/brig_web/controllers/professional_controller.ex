defmodule BrigWeb.ProfessionalController do
  use BrigWeb, :controller

  alias Brig.Professionals
  alias Brig.Professionals.Compatibility

  def all(conn, _params) do
    professionals = Professionals.list()

    conn
    |> render("all.json", professionals: professionals)
  end

  @doc """
  Body:
  {
    reasonForSeekingHelp: string, Anxiety | Depression
    age: number
    isReligious: boolean
    isSpiritual: boolean
    politicalAlignment: string, Liberal | Moderate | Conservative
  }
  """
  def search(conn, params) do
    good_pros = Compatibility.get_compatible_pros(params)

    conn
    |> render("all.json", professionals: good_pros)
  end
end
