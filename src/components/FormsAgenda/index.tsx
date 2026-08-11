"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Clock2Icon } from "lucide-react";

export default function FormsAgenda() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );
  const inputStyle = "p-2 border border-bege rounded-lg w-full";
  return (
    <section className="flex flex-col py-12 px-6 gap-12 bg-gray-100 rounded-xl drop-shadow-xl max-w-200">
      {/* Seus Dados */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="flex justify-center items-center  bg-bege/50 w-7 h-7 rounded-full shrink-0 font-semibold">
            1
          </span>
          <h1 className="text-2xl font-semibold ">Seus Dados</h1>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h1>Nome Completo</h1>
              <input
                type="text"
                placeholder="Ana Paula"
                className={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>E-mail</h1>
              <input
                type="text"
                placeholder="Ana Paula"
                className={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Telefone</h1>
              <input
                type="text"
                placeholder="Ana Paula"
                className={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Empresa (Opcional)</h1>
              <input
                type="text"
                placeholder="Ana Paula"
                className={inputStyle}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Detalhes Reunião */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="flex justify-center items-center  bg-bege/50 w-7 h-7 rounded-full shrink-0 font-semibold">
            2
          </span>
          <h1 className="text-xl font-semibold ">Detalhes da Reunião</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1>Tipo de Reunião</h1>
            <input
              type="text"
              className={inputStyle}
              placeholder="Consultoria Inicial"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1>Assunto/Observações</h1>
              <textarea
                className={inputStyle}
                placeholder="Digite aqui brevemente o que gostaria de abordar ou dúvidas que deseja esclarecer durante a conversa..."
              />
            </div>
          </div>
        </div>
      </div>
      {/* Selecione Data e Horário */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="flex justify-center items-center  bg-bege/50 w-7 h-7 rounded-full shrink-0 font-semibold">
            3
          </span>
          <h1 className="text-2xl font-semibold ">
            Selecione uma data e um horário
          </h1>
        </div>
        <div className="flex gap-8">
          <Card size="default" className=" w-fit">
            <CardContent>
              <Calendar
                mode="single"
                locale={ptBR}
                selected={date}
                onSelect={setDate}
                className="p-0 [--cell-size:--spacing(12)]"
              />
            </CardContent>
            <CardFooter className="border-t bg-card">
              <FieldGroup className="flex flex-row">
                <Field>
                  <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-from"
                      type="time"
                      step="1"
                      defaultValue="10:30:00"
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <InputGroupAddon>
                      <Clock2Icon className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-to"
                      type="time"
                      step="1"
                      defaultValue="12:30:00"
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <InputGroupAddon>
                      <Clock2Icon className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-4">
            <h3>Horários Disponíveis (15/08)</h3>
            <div className="grid grid-cols-3 gap-6">
              <button
                className={`py-2 px-4 border border-bege rounded-lg text-lg hover:bg-primaria hover:text-white hover:border-primaria transition-colors`}
              >
                7:00
              </button>
              <button
                className={`py-2 px-4 border border-bege rounded-lg text-lg hover:bg-primaria hover:text-white hover:border-primaria transition-colors`}
              >
                9:00
              </button>
              <button
                className={`py-2 px-4 border border-bege rounded-lg text-lg hover:bg-primaria hover:text-white hover:border-primaria transition-colors`}
              >
                11:00
              </button>
              <button
                className={`py-2 px-4 border border-bege rounded-lg text-lg hover:bg-primaria hover:text-white hover:border-primaria transition-colors`}
              >
                12:30
              </button>
              <button
                className={`py-2 px-4 border border-bege rounded-lg text-lg hover:bg-primaria hover:text-white hover:border-primaria transition-colors`}
              >
                14:00
              </button>
              <button
                className={`py-2 px-4 border border-bege rounded-lg text-lg hover:bg-primaria hover:text-white hover:border-primaria transition-colors`}
              >
                16:00
              </button>
            </div>
            <p className="text-gray-500">
              Fuso horário: Horário de Brasília (GMT-3)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
