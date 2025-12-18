import { Component } from '@angular/core';
import { DollarSign, ShoppingCart, Users, TrendingUp, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-component',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-component.html',
  standalone: true,
})
export class DashboardComponent {
  readonly DollarSign = DollarSign;
  readonly ShoppingCart = ShoppingCart;
  readonly Users = Users;
  readonly TrendingUp = TrendingUp;

  statsCards = [
    {
      title: 'Total Revenue',
      value: '$359,789',
      change: '24.4%',
      icon: DollarSign,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      changePositive: true
    },
    {
      title: 'Total Orders',
      value: '3,185',
      change: '17.9%',
      icon: ShoppingCart,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      changePositive: true
    },
    {
      title: 'Total Customers',
      value: '881',
      change: '10.6%',
      icon: Users,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      changePositive: true
    },
    {
      title: 'Conversion Rate',
      value: '2.3%',
      change: '2%',
      icon: TrendingUp,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      changePositive: true
    }
  ];
}
