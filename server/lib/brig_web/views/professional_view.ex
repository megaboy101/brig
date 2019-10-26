defmodule BrigWeb.ProfessionalView do
  use BrigWeb, :view

  def render("all.json", %{professionals: professionals}) do
    %{
      ok: true,
      data: render_many(professionals, BrigWeb.ProfessionalView, "professional.json")
    }
  end

  def render("professional.json", %{professional: professional}) do
    %{
      name: professional.name,
      age: professional.age,
      rate: professional.rate,
      services: professional.services,
      specialties: professional.specialties
    }
  end
end
