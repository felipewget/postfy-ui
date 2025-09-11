"use client";

import { useList } from "@/api/dashboard";
import { Client } from "@/declarators";
import { Select } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconUsersGroup } from "@tabler/icons-react";
import { FC, SetStateAction } from "react";
import { useState } from "react";

export const SelectClientFilter: FC<{
  onChange: SetStateAction<any>;
}> = ({onChange}) => {
  // Use um estado para armazenar o valor do select
  const [value, setValue] = useState<string | null>(null);

  // Usa o useDebouncedState para atrasar a busca em 300ms
  const [search, setSearch] = useDebouncedState("", 300);

  // Busca os dados da API usando o valor de `search`
  // Assumindo que seu `useList` funciona com paginação e busca
  const { data, isLoading } = useList({
    entity: "clients",
    params: {
      search,
      searchFields: "name,emails,websites",
    },
  });

  // Mapeia os dados para o formato que o Select do Mantine entende
  const mappedClients = (data?.pages.flat() ?? []).map((client: Client) => ({
    value: String(client.id),
    label: client.name,
  }));

  return (
    <Select
      leftSection={<IconUsersGroup size="16px" />}
      radius="sm"
      placeholder="Pesquisar cliente..."
      nothingFoundMessage={
        isLoading ? "Carregando..." : "Nenhum cliente encontrado"
      }
      searchable // Ativa o campo de busca
      clearable // Adiciona um botão para limpar a seleção
      // Conecta o valor do Select ao estado `value`
      value={value}
      onChange={(value) => {
        onChange(value);
        setValue(value);
      }}
      // Conecta a busca do Select ao estado `search`
      onSearchChange={setSearch}
      data={mappedClients}
    />
  );
};
