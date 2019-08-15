import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { User } from './user-create-update/user.model';
import { List } from '../../../core/list/list.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { MatPaginator, MatSort } from '@angular/material';
import { USERS_DATA } from './users.demo';
import { filter, takeUntil } from 'rxjs/operators';
import { componentDestroyed } from '../../../core/utils/component-destroyed';

@Component({
  selector: 'elastic-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: {'[@routeTransition]': ''}
})
export class UsersManagementComponent implements List<User>, OnInit, OnDestroy {

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]>;
  users: User[];

  @Input()
  columns: ListColumn[] = [
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Username', property: 'username', visible: true, isModelProperty: true},
    {name: 'Email', property: 'email', visible: true, isModelProperty: true},
    {name: 'Role', property: 'role', visible: true, isModelProperty: true},
    {name: 'Status', property: 'status', visible: true, isModelProperty: true},
    {name: 'Created at', property: 'created_at', visible: true, isModelProperty: true},
    {name: 'Updated at', property: 'updated_at', visible: true, isModelProperty: true}
  ] as ListColumn[];

  pageSize = 10;
  resultsLength: number;
  dataSource: ListDataSource<User> | null;
  database: ListDatabase<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.users = USERS_DATA.map(user => new User(user));
    this.subject$.next(this.users);
    this.data$ = this.subject$.asObservable();
    this.database = new ListDatabase<User>();
    this.data$.pipe(
      takeUntil(componentDestroyed(this)),
      filter(Boolean)
    ).subscribe((users) => {
      this.users = users;
      this.database.dataChange.next(users);
      this.resultsLength = users.length;
    });
    this.dataSource = new ListDataSource<User>(this.database, this.sort, this.paginator, this.columns);
  }

  ngOnDestroy(): void {
  }

  onFilterChange(value): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = value;
  }

}
