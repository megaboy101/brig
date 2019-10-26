defmodule BrigWeb.ProfessionalController do
  use BrigWeb, :controller

  alias Brig.Professionals

  def all(conn, _params) do
    professionals = Professionals.list_professionals()

    conn
    |> render("all.json", professionals: professionals)
  end
end
