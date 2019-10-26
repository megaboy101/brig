defmodule Brig.Professionals do

  import Ecto.Query, warn: false
  alias Brig.Repo

  alias Brig.Professionals.Professional

  def list do
    Repo.all(Professional)
  end

  def get!(id), do: Repo.get!(Professional, id)

  def create(attrs \\ %{}) do
    %Professional{}
    |> Professional.changeset(attrs)
    |> Repo.insert()
  end

  def update(%Professional{} = professional, attrs) do
    professional
    |> Professional.changeset(attrs)
    |> Repo.update()
  end

  def delete(%Professional{} = professional) do
    Repo.delete(professional)
  end

  def change(%Professional{} = professional) do
    Professional.changeset(professional, %{})
  end
end
