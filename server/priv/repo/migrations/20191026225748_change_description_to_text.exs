defmodule Brig.Repo.Migrations.ChangeDescriptionToText do
  use Ecto.Migration

  def change do
    alter table(:professionals) do
      modify :description, :text
    end
  end
end
