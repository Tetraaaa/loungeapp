import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import { useRef, useState } from "react";

interface IAPIResult {
    type: "FeatureCollection";
    version: "draft";
    features: IFeature[];
    attribution: "BAN";
    licence: "ETALAB-2.0";
    query: string;
    limit: number;
}

interface IFeature {
    type: "Feature";
    geometry: object;
    properties: IProperty;
}

interface IProperty {
    label: string;
    score: number;
    id: string;
    type: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    population: number;
    city: string;
    context: string;
    importance: number;
    municipality: string;
}

export default function BirthPlaceInput({ onChange }) {
    function fetchAPIData(value: string, signal: AbortSignal) {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("q", value);
        params.append("limit", "15");
        params.append("type", "municipality");

        return fetch(`https://api-adresse.data.gouv.fr/search/?${params}`, {
            signal,
        }).then((r) => r.json());
    }
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IProperty[] | null>(null);
    const [value, setValue] = useState("");
    const [empty, setEmpty] = useState(false);
    const abortController = useRef<AbortController>();

    const fetchOptions = (query: string) => {
        abortController.current?.abort();
        abortController.current = new AbortController();
        setLoading(true);

        fetchAPIData(query, abortController.current.signal)
            .then((result: IAPIResult) => {
                setData(result.features.map((f) => f.properties));
                setLoading(false);
                setEmpty(result.features.length === 0);
                abortController.current = undefined;
            })
            .catch(() => {});
    };

    const options = (data || []).map((item) => (
        <Combobox.Option value={`${item.city}`} key={item.id}>
            {`${item.city === "Strasbourg" ? "🥨" : ""} ${item.city} (${
                item.context
            })`}
        </Combobox.Option>
    ));

    return (
        <Combobox
            onOptionSubmit={(optionValue) => {
                setValue(optionValue);
                combobox.closeDropdown();
                const value = data.find((o) => o.city === optionValue);
                onChange({
                    city: value.city,
                    state: value.context,
                });
            }}
            withinPortal={true}
            store={combobox}
        >
            <Combobox.Target>
                <TextInput
                    label="Lieu de naissance"
                    placeholder="Rechercher..."
                    value={value}
                    onChange={(event) => {
                        setValue(event.currentTarget.value);
                        fetchOptions(event.currentTarget.value);
                        combobox.resetSelectedOption();
                        combobox.openDropdown();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => {
                        combobox.openDropdown();
                        if (data === null) {
                            fetchOptions(value);
                        }
                    }}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={loading && <Loader size={18} />}
                />
            </Combobox.Target>

            <Combobox.Dropdown hidden={data === null}>
                <Combobox.Options>
                    {options}
                    {empty && <Combobox.Empty>Aucun résultat</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
